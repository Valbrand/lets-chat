import React, { Component } from "react";

import "./ChatRoomHeader.css";

export default class ChatRoomHeader extends Component {
  render() {
    const { chatRoomData } = this.props;
    const isChatOpen = chatRoomData !== null;

    return (
      <h1 className="chat-room-header__root">
        {isChatOpen ? chatRoomData.name : "Let's chat!"}
      </h1>
    );
  }
}
