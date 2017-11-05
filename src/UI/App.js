import React, { Component } from "react";

import "./App.css";
import ChatRoomList from "./ChatRoomList/ChatRoomList";
import ChatRoom from "./ChatRoom/ChatRoom";

class App extends Component {
  render() {
    const { messagesWatcher } = this.props;

    return (
      <div className="app__root">
        <div className="app__chat-container">
          <div className="app__left-column">
            <div className="app__column-inner-container">
              <ChatRoomList />
            </div>
          </div>
          <div className="app__right-column">
            <div className="app__column-inner-container">
              <ChatRoom messagesWatcher={messagesWatcher} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
