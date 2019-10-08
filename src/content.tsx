import * as React from 'react';
declare const chrome: any;

import * as ReactDOM from 'react-dom';
import "./content.less";
import { CONTENT_MESSAGE_TYPES } from "./constants";

interface IMainProps {}
interface IMainState {
  error: string;
  message: string;
}

class Main extends React.Component<IMainProps, IMainState> {
  private url: string;
  constructor(props: IMainProps) {
    super(props);
    this.url = window.location.host;
    this.state = {
      error: null,
      message: '',
    };
  }

  public componentDidMount() {
    const self = this;
    // console.log(window.location);
    chrome.runtime.sendMessage(
      { message: CONTENT_MESSAGE_TYPES.CURRENT_URL, url: this.url },
      function(response: any) {
        console.log(response);
        // if (response.success) {
        //   self.setState({
        //     ...self.state,
        //     message: response.message,
        //   });
        // } else {
        //   self.setState({
        //     ...this.state,
        //     error: response.error,
        //   });
        // }
      },
    );
  }
  public render() {
    return (
      <div id="shopify-scraper">
        <h1>{window.location.host}</h1>
        {this.state.error && <div>{this.state.error}</div>}
        {!this.state.error &&<button onClick={this.scrapeCurrentWebsite.bind(this)}>
          Scrape now
        </button>}
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
