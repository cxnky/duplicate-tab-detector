document.addEventListener('DOMContentLoaded', async () => {
  const statusDiv = document.getElementById('status');
  const duplicatesDiv = document.getElementById('duplicates');
  
  try {
    const [currentTab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (isSpecialPage(currentTab.url)) {
      statusDiv.textContent = "This is a browser page. No duplicates to check.";
      return;
    }
    
    const currentUrl = normaliseUrl(currentTab.url);
    
    const tabs = await chrome.tabs.query({});
    
    const duplicates = tabs.filter(tab => 
      tab.id !== currentTab.id && normaliseUrl(tab.url) === currentUrl
    );
    
    if (duplicates.length === 0) {
      statusDiv.textContent = "No duplicate tabs found.";
      return;
    }
    
    statusDiv.textContent = `Found ${duplicates.length} duplicate tab(s):`;
    
    duplicates.forEach(tab => {
      const div = document.createElement('div');
      div.className = 'duplicate-item';
      
      const title = document.createElement('div');
      title.textContent = tab.title || tab.url;
      div.appendChild(title);
      
      const switchBtn = document.createElement('button');
      switchBtn.textContent = 'Switch to this tab';
      switchBtn.onclick = () => {
        chrome.tabs.update(tab.id, { active: true });
        chrome.windows.update(tab.windowId, { focused: true });
      };
      div.appendChild(switchBtn);
      
      const closeBtn = document.createElement('button');
      closeBtn.textContent = 'Close this duplicate';
      closeBtn.onclick = () => {
        chrome.tabs.remove(tab.id);
        div.remove();
        
        const remaining = duplicatesDiv.querySelectorAll('.duplicate-item').length;
        if (remaining === 0) {
          statusDiv.textContent = "No duplicate tabs remaining.";
        } else {
          statusDiv.textContent = `Found ${remaining} duplicate tab(s):`;
        }
      };
      div.appendChild(closeBtn);
      
      duplicatesDiv.appendChild(div);
    });
  } catch (error) {
    statusDiv.textContent = "Error: " + error.message;
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