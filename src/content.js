// This script will be injected into the page

// Create and initialize the popup
function showDuplicatePopup(message) {
  // Create container
  const popup = document.createElement('div');
  popup.id = 'duplicate-tab-detector-popup';
  popup.innerHTML = `
    <div class="dtd-header">
      <span class="dtd-title">Duplicate Tab Detected</span>
      <button class="dtd-close">&times;</button>
    </div>
    <div class="dtd-content">
      ${message}
    </div>
    <div class="dtd-buttons">
      <button class="dtd-switch-btn">Switch to Existing Tab</button>
      <button class="dtd-ignore-btn">Keep Both Tabs</button>
    </div>
  `;
  
  document.body.appendChild(popup);
  
  // Add event listeners
  popup.querySelector('.dtd-close').addEventListener('click', () => {
    popup.remove();
  });
  
  popup.querySelector('.dtd-switch-btn').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'switchToExistingTab' });
    popup.remove();
  });
  
  popup.querySelector('.dtd-ignore-btn').addEventListener('click', () => {
    popup.remove();
  });
  
  // Auto-hide after 10 seconds
  setTimeout(() => {
    if (popup.parentNode) {
      popup.remove();
    }
  }, 10000);
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'showDuplicatePopup') {
    showDuplicatePopup(message.content);
    sendResponse({ status: 'popup shown' });
  }
  return true;
}); 