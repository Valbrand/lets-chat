import React, { Component } from "react";

import "./ChatRoomListView.css";
import ChatRoomListItem from "./components/ChatRoomListItem/ChatRoomListItem";
import CreateChatRoomButton from "./components/CreateChatRoomButton/CreateChatRoomButton";

export class ChatRoomListView extends Component {
  render() {
    const { chatRooms, createChatRoom } = this.props;

    return (
      <div className="chat-room-list__root">
        <h1 className="chat-room-list__header">Chat rooms</h1>
        {chatRooms
          .map(chatRoom => {
            return (
              <ChatRoomListItem
                key={chatRoom.id}
                chatRoom={chatRoom}
                onSelect={this.chatRoomSelectionHandler(chatRoom.id)}
              />
            );
          })
          .concat(
            <CreateChatRoomButton key={-1} createChatRoom={createChatRoom} />
          )}
      </div>
    );
  }

  chatRoomSelectionHandler = roomId => {
    return () => {
      if (roomId !== this.props.selectedChatRoom) {
        this.props.selectChatRoom(roomId);
      }
    };
  };

  componentDidMount() {
    this.props.observeChatRooms();
  }

  componentWillUnmount() {
    this.props.stopObservingChatRooms();
  }
}
