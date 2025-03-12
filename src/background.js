chrome.tabs.onCreated.addListener(async (newTab) => {
  chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo, tab) {
    if (tabId !== newTab.id || !changeInfo.url) {
      return;
    }
    
    chrome.tabs.onUpdated.removeListener(listener);
    
    const currentUrl = normaliseUrl(changeInfo.url);
    
    if (isSpecialPage(currentUrl)) {
      return;
    }
    
    checkForDuplicates(newTab);
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    checkForDuplicates(tab);
  }
});

function normaliseUrl(url) {
  try {
    return url;
  } catch (e) {
    return url;
  }
}

function isSpecialPage(url) {
  return url.startsWith('chrome://') || 
         url.startsWith('chrome-extension://') || 
         url.startsWith('about:') ||
         url === 'about:blank' ||
         url === 'chrome://newtab/';
}

async function checkForDuplicates(currentTab) {
  if (isSpecialPage(currentTab.url)) {
    return;
  }
  
  const currentUrl = normaliseUrl(currentTab.url);
  
  const tabs = await chrome.tabs.query({});
  
  const duplicates = tabs.filter(tab => 
    tab.id !== currentTab.id && 
    normaliseUrl(tab.url) === currentUrl
  );
  
  if (duplicates.length > 0) {
    chrome.action.setBadgeText({
      text: duplicates.length.toString(),
      tabId: currentTab.id
    });
    
    chrome.action.setBadgeBackgroundColor({
      color: '#FF0000',
      tabId: currentTab.id
    });
    
    chrome.storage.local.set({ 
      duplicateTabId: duplicates[0].id,
      duplicateWindowId: duplicates[0].windowId
    });
    
    try {
      await chrome.tabs.sendMessage(currentTab.id, {
        action: 'showDuplicatePopup',
        content: `This page is already open in ${duplicates.length} other tab${duplicates.length > 1 ? 's' : ''}.`
      });
    } catch (error) {
      console.error("Error sending message to content script:", error);
    }
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'switchToExistingTab') {
    chrome.storage.local.get(['duplicateTabId', 'duplicateWindowId'], (data) => {
      if (data.duplicateTabId && data.duplicateWindowId) {
        chrome.windows.update(data.duplicateWindowId, { focused: true });
        
        chrome.tabs.update(data.duplicateTabId, { active: true });
        
        if (sender.tab) {
          chrome.tabs.remove(sender.tab.id);
        }
      }
    });
  }
  return true;
});