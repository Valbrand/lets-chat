import React, { Component } from "react";
import { connect } from "react-redux";

import "./ChatRoomList.css";
import ChatRoomListItem from "./ChatRoomListItem/ChatRoomListItem";
import CreateChatRoomButton from "./CreateChatRoomButton/CreateChatRoomButton";
import { selectChatRoom } from "../../state/selectedChatRoom/selectedChatRoom";

class ChatRoomList extends Component {
  render() {
    const { chatRooms } = this.props;

    return (
      <div className="chat-room-list__root">
        <h1 className="chat-room-list__header">Chat rooms</h1>
        {Object.keys(chatRooms)
          .map(roomId => {
            const chatRoom = chatRooms[roomId];

            return (
              <ChatRoomListItem
                key={roomId}
                chatRoom={chatRoom}
                onSelect={this.chatRoomSelectionHandler(roomId)}
              />
            );
          })
          .concat(<CreateChatRoomButton key={-1} />)}
      </div>
    );
  }

  chatRoomSelectionHandler = roomId => {
    return () => {
      this.props.selectChatRoom(roomId);
    };
  };
}

function mapState(state) {
  return {
    chatRooms: state.chatRooms,
    currentUser: state.currentUser
  };
}

export default connect(mapState, { selectChatRoom })(ChatRoomList);
