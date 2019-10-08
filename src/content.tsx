import * as React from 'react';
declare const chrome: any;

import * as ReactDOM from 'react-dom';
import { CONTENT_MESSAGE_TYPES } from './constants';
import './content.less';

interface IMainProps { }
interface IMainState {
  error: string;
  message: string;
  isValid: boolean|'loading';
}

const sendMessage = (requestData: any, callback: (response: any) => any) => {
  chrome.runtime.sendMessage(
    requestData,
    (response: any) => {
      // tslint:disable-next-line:no-console
      console.log('Request: ', requestData);
      // tslint:disable-next-line:no-console
      console.log('Response: ', response);
      callback(response);
    },
  );

};

class Main extends React.Component<IMainProps, IMainState> {
  private url: string;
  constructor(props: IMainProps) {
    super(props);
    this.url = window.location.host;
    this.state = {
      error: null,
      isValid: 'loading',
      message: '',
    };
  }

  public componentDidMount() {
    const responseHandler = (response: any) => {
      if (response.success) {
        if (response.isValid) {
          this.setState({
            ...this.state,
            isValid: response.isValid,
            message: response.message,
          });
        } else {
          this.setState({
            ...this.state,
            error: 'This is not a valid Shopify Site',
            isValid: response.isValid,
          });
        }
      } else {
        // @todo (rajat, 8-10-2019): handle failed response
      }
    };
    sendMessage({ message: CONTENT_MESSAGE_TYPES.CURRENT_URL, url: this.url }, responseHandler);

  }
  public render() {
    console.log(this.state);
    const scrapeClickHandler = this.scrapeCurrentWebsite.bind(this);
    return (
      <div id='shopify-scraper'>
        <h1>{window.location.host}</h1>
        {!this.state.isValid && <div>{this.state.error}</div>}
        {this.state.isValid &&
          (
            <button onClick={scrapeClickHandler}>
              Scrape now
            </button>
          )
        }
        {this.state.message}
      </div>
    );
  }

  private scrapeCurrentWebsite() {

  }
}

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<Main />, app);

app.style.display = 'none';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'clicked_browser_action') {
    toggle();
  }
});

function toggle() {
  if (app.style.display === 'none') {
    app.style.display = 'block';
  } else {
    app.style.display = 'none';
  }
}
