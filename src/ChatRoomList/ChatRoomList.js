import React, { Component, PropTypes } from "react";

export default class ChatRoomList extends Component {
  render() {
    const { chatRooms } = this.props;

    return Object.keys(chatRooms)
      .map(roomId => {
        const chatRoom = chatRooms[roomId];

        return (
          <div key={roomId}>
            <h2>{chatRoom.name}</h2>
            <p>{chatRoom.lastMessage.sender}</p>
            <p>{chatRoom.lastMessage.content}</p>
            <p>{chatRoom.lastMessage.timestamp.toString()}</p>
          </div>
        );
      })
      .concat(<button>Add new chat room</button>);
  }
}
