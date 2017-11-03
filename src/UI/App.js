import React, { Component } from "react";

import "./App.css";
import ChatRoomList from "./ChatRoomList/ChatRoomList";
import ChatRoom from "./ChatRoom/ChatRoom";

class App extends Component {
  render() {
    return (
      <div className="app__root">
        <div className="app__chat-container">
          <div className="app__left-column">
            <ChatRoomList />
          </div>
          <div className="app__right-column">
            <ChatRoom />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
