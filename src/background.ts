declare const chrome: any;

chrome.browserAction.onClicked.addListener((tab: any) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any[]) => {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {
      message: "clicked_browser_action"
    });
  });
});