import React, { Component } from "react";

import "./App.css";

import { createChatRoomListModule } from "./ChatRoomList/ChatRoomList";
import { createChatRoomModule } from "./ChatRoom/ChatRoom";

class App extends Component {
  render() {
    const { chatRoomService, messagesService } = this.props;

    return (
      <div className="app__root">
        <div className="app__chat-container">
          <div className="app__left-column">
            <div className="app__column-inner-container">
              {createChatRoomListModule(chatRoomService).render()}
            </div>
          </div>
          <div className="app__right-column">
            <div className="app__column-inner-container">
              {createChatRoomModule(messagesService).render()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
