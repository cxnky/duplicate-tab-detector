# Duplicate-Tab-Detector

## Overview

If you frequently open multiple tabs for the same site and page, Duplicate-Tab-Detector helps manage duplicates. When you navigate to a page already open in another tab, a popup appears offering you the option to switch to the existing tab and close the duplicate, or keep the new tab open.

## Key Features

- **Duplicate Detection:** Scans new tabs to check if the page is already open.
- **Popup Prompt:** Notifies you when a duplicate is found and offers actions.
- **Tab Switching:** Allows quick navigation to the original tab.
- **Close Duplicate:** Provides an option to automatically close the duplicate tab.

## File Structure

```
DUPLICATE-TAB-DETECTOR
├─ img
│  └─ icon.png
├─ src
│  ├─ css
│  │  └─ content.css
│  ├─ background.js
│  ├─ content.js
│  ├─ popup.js
│  └─ popup.html
├─ manifest.json
└─ README.md
```

## Installation
> [!NOTE]
> 
> It's generally recommended to install the extension from the Chrome Web Store (link coming soon), in order for the extension to auto-update as and when new fixes/improvements/features are pushed.

1. Clone or download this repository.
2. Open Chrome (or a Chromium-based browser) and navigate to `chrome://extensions/`.
3. Enable **Developer Mode**.
4. Click **Load unpacked** and select the `DUPLICATE-TAB-DETECTOR` folder.
5. The extension icon should now appear in your browser toolbar.

## Usage

1. Open your browser and navigate as usual.
2. When you open a tab that duplicates an existing one, a popup will appear.
3. Choose **Switch to Existing Tab** to navigate to the already open tab.
4. Alternatively, select **Close Duplicate** to close the new tab.

## Contributing

Contributions are welcome!  
Feel free to open issues or submit pull requests to improve functionality or fix bugs.

## License

This project is licensed under the [MIT License](LICENSE). See the LICENSE file for details.
