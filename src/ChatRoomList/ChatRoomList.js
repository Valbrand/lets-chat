import React, { Component } from "react";

import "./ChatRoomList.css";
import ChatRoomListItem from "./ChatRoomListItem/ChatRoomListItem";

export default class ChatRoomList extends Component {
  render() {
    const { chatRooms } = this.props;

    return (
      <div className="chat-room-list-root">
        <h1 className="chat-room-list-header">Chat rooms</h1>
        {Object.keys(chatRooms)
          .map(roomId => {
            const chatRoom = chatRooms[roomId];

            return <ChatRoomListItem key={roomId} chatRoom={chatRoom} />;
          })
          .concat(<button>Add new chat room</button>)}
      </div>
    );
  }
}
