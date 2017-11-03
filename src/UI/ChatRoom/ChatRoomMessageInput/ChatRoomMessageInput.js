import React, { Component } from "react";

import "./ChatRoomMessageInput.css";
import createMessagesService from "../../../firebase/messagesService/messagesService";

export default class ChatRoomMessageInput extends Component {
  messagesService = createMessagesService();
  state = {
    message: ""
  };

  render() {
    const { chatRoomData } = this.props;

    if (chatRoomData != null) {
      return (
        <form
          className="chat-room-message-input__root"
          onSubmit={this.messageSubmissionHandler}
        >
          <input
            className="chat-room-message-input__text-field"
            type="text"
            value={this.state.message}
            onChange={this.messageBodyChanged}
          />
        </form>
      );
    } else {
      return null;
    }
  }

  messageBodyChanged = event => {
    this.setState({ message: event.target.value });
  };

  messageSubmissionHandler = event => {
    event.preventDefault();

    const { message } = this.state;
    const { chatRoomData, currentUser } = this.props;

    debugger;

    this.messagesService.sendMessage(chatRoomData.id, currentUser, message);
  };
}
