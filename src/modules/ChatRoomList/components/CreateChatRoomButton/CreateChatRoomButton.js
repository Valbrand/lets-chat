import React, { Component } from "react";

import "./CreateChatRoomButton.css";
import randomName from "../../../../utils/randomName/randomName";

export default class CreateChatRoomButton extends Component {
  render() {
    return (
      <div
        className="create-chat-room-button__root"
        onClick={this.createChatRoom}
      >
        Create a new room
      </div>
    );
  }

  createChatRoom = () => {
    this.props.createChatRoom(randomName());
  };
}
