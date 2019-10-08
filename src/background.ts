import { CONTENT_MESSAGE_TYPES } from './constants';
import { Scraper } from './Scraper';
declare const chrome: any;
interface IResponse {
  success: boolean;
}
interface IUrlRequestResponse extends IResponse {
  isValid: boolean;
}

chrome.browserAction.onClicked.addListener((tab: any) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any[]) => {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {
      message: 'clicked_browser_action',
    });
  });
});

// The function registered here as a listener has to be a non async function;
// This function has to return true and call all the internal async functions in a non awaited call;
chrome.runtime.onMessage.addListener( (request: { message: CONTENT_MESSAGE_TYPES; url: any; }, sender: any, sendResponse: (response: any) => any) => {
  const logAndSend = (response: any) => { console.log(request); console.log(response); sendResponse(response); };
  if (request.message === CONTENT_MESSAGE_TYPES.CURRENT_URL) {
    // do not make awaited calls and return true
    handleUrlRequest(request.url, logAndSend);
  }
  return true;
});

const handleUrlRequest = async (url: string, reply: (response: IUrlRequestResponse) => any) => {
  const scraper = new Scraper(url);
  reply({
    isValid: await scraper.isValid(),
    success: true,
  });
  return true;
};
