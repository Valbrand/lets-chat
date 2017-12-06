import React, { Component } from "react";

import "./AppView.css";

import { createChatRoomListModule } from "../../modules/ChatRoomList/ChatRoomListModule";
import { createChatRoomModule } from "../../modules/ChatRoom/ChatRoomModule";

export class AppView extends Component {
  render() {
    const { shouldShowChatInterface, storeService } = this.props;

    return (
      <div className="app__root">
        {shouldShowChatInterface ? (
          <div className="app__chat-container">
            <div className="app__left-column">
              <div className="app__column-inner-container">
                {createChatRoomListModule(storeService).render()}
              </div>
            </div>
            <div className="app__right-column">
              <div className="app__column-inner-container">
                {createChatRoomModule(storeService).render()}
              </div>
            </div>
          </div>
        ) : (
          <h1>Connecting...</h1>
        )}
      </div>
    );
  }

  componentDidMount() {
    this.props.observeAuthState();
  }

  componentWillUnmount() {
    this.props.stopObservingAuthState();
  }
}
