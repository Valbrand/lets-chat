import React, { Component } from "react";

import "./AppView.css";

import { createChatRoomListModule } from "../../modules/ChatRoomList/ChatRoomList";
import { createChatRoomModule } from "../../modules/ChatRoom/ChatRoom";

class App extends Component {
  render() {
    const {
      shouldShowChatInterface,
      chatRoomService,
      messagesService,
      storeService
    } = this.props;

    return (
      <div className="app__root">
        {shouldShowChatInterface ? (
          <div className="app__chat-container">
            <div className="app__left-column">
              <div className="app__column-inner-container">
                {createChatRoomListModule(
                  chatRoomService,
                  storeService
                ).render()}
              </div>
            </div>
            <div className="app__right-column">
              <div className="app__column-inner-container">
                {createChatRoomModule(messagesService, storeService).render()}
              </div>
            </div>
          </div>
        ) : (
          <h1>Connecting...</h1>
        )}
      </div>
    );
  }
}

export default App;
