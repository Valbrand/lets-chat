import React, { Component } from "react";

import "./AppView.css";

import { ChatRoomListContainer } from "../../containers/ChatRoomList/ChatRoomListContainer";
import { ChatRoomContainer } from "../../containers/ChatRoom/ChatRoomContainer";

export class AppView extends Component {
  render() {
    const { shouldShowChatInterface } = this.props;

    return (
      <div className="app__root">
        {shouldShowChatInterface ? (
          <div className="app__chat-container">
            <div className="app__left-column">
              <div className="app__column-inner-container">
                <ChatRoomListContainer />
              </div>
            </div>
            <div className="app__right-column">
              <div className="app__column-inner-container">
                <ChatRoomContainer />
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
