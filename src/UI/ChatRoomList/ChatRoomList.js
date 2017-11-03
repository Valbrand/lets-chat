import React, { Component } from "react";
import { connect } from "react-redux";

import "./ChatRoomList.css";
import ChatRoomListItem from "./ChatRoomListItem/ChatRoomListItem";
import CreateChatRoomButton from "./CreateChatRoomButton/CreateChatRoomButton";

class ChatRoomList extends Component {
  render() {
    const { chatRooms } = this.props;

    return (
      <div className="chat-room-list__root">
        <h1 className="chat-room-list__header">Chat rooms</h1>
        {Object.keys(chatRooms)
          .map(roomId => {
            const chatRoom = chatRooms[roomId];

            return <ChatRoomListItem key={roomId} chatRoom={chatRoom} />;
          })
          .concat(<CreateChatRoomButton key={-1} />)}
      </div>
    );
  }
}

function mapState(state) {
  return {
    chatRooms: state.chatRooms,
    currentUser: state.currentUser
  };
}

export default connect(mapState, {})(ChatRoomList);
