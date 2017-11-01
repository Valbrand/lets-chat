import React, { Component } from "react";

export default class ChatRoom extends Component {
  render() {
    const { chatRoomData, messages } = this.props;

    if (chatRoomData === null) {
      return (
        <div>
          <p>Select a room to start chatting!</p>
        </div>
      );
    }

    return (
      <div>
        {messages.map((message, index) => {
          return (
            <div key={index}>
              <p>{message.sender}</p>
              <p>{message.content}</p>
              <p>{message.timestamp.valueOf()}</p>
            </div>
          );
        })}
      </div>
    );
  }
}
