import React, { Component } from "react";

import "./CreateChatRoomButton.css";
import createChatRoomService from "../../../firebase/chatRoomService/chatRoomService";
import randomName from "../../../utils/randomName/randomName";

export default class CreateChatRoomButton extends Component {
  chatRoomService = createChatRoomService();

  render() {
    return (
      <div className="create-chat-room-button__root" onClick={this.createRoom}>
        Create a new room
      </div>
    );
  }

  createRoom = () => {
    this.chatRoomService.createChatRoom(randomName());
  };
}
