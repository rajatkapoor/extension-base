import * as React from 'react';
declare const chrome: any;

import * as ReactDOM from 'react-dom';
// import Frame, { FrameContextConsumer } from "react-frame-component";
// import "./content.css";
import { CONTENT_MESSAGE_TYPES } from "./constants";

class Main extends React.Component {
  private url: string;
  constructor(props: Readonly<{}>) {
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
      <div>
        heu
      </div>
    );
    // return (
    //   head as Frame ={[
    //       type as link = 'text/css'
    //         rel= 'stylesheet'
    //         href= {chrome.runtime.getURL('/static/css/content.css')}
    //       > (/link> as )
    //     ], , , , , , , ,,, , , , , , , , , , , ,,,,,,,,,}
    //   >
    //     ({// Callback is invoked with iframe's window and document instances
    //       ({ document, window }) as FrameContextConsumer); => {
    //         // Render Children
    //         return (
    //           className as div = {'my-extension'} >
    //             ({window.location.host} as h1) < /h1>;
    //         {this.state.error && ({this.state.error} as div) < /div>};
    //          {!this.state.error && (onClick as button); = {this.scrapeCurrentWebsite.bind(this); } >
    //               Scrape; now
    //             < /button>};
    //           {this.state.message; }
    //           /div>; as;
    //         )
    //       }}
    //         (/FrameContextConsumer> as )
    //   < /Frame>;
    // );
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
