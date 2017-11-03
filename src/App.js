import React, { Component } from "react";

import "./App.css";
import ChatRoomList from "./ChatRoomList/ChatRoomList";
import ChatRoom from "./ChatRoom/ChatRoom";

class App extends Component {
  state = {
    selectedChatRoom: null,

    currentUser: null,

    chatRooms: {
      "0": {
        name: "Teste",
        lastMessage: {
          sender: "John Doe",
          content: "Hello world",
          timestamp: new Date()
        }
      }
    },

    messages: {
      "0": [
        {
          sender: "John Doe",
          content: "Hello world",
          timestamp: new Date()
        },
        {
          sender: "oeD jhoJ",
          content: "dlrow olleH",
          timestamp: new Date()
        }
      ]
    }
  };

  render() {
    const { selectedChatRoom, chatRooms, messages, currentUser } = this.state;

    const selectedChatRoomData =
      selectedChatRoom === null ? null : chatRooms[selectedChatRoom];
    const selectedChatRoomMessages =
      selectedChatRoom === null ? null : messages[selectedChatRoom];

    return (
      <div className="app__root">
        <div className="app__chat-container">
          <div className="app__left-column">
            <ChatRoomList
              chatRooms={this.state.chatRooms}
              currentUser={currentUser}
            />
          </div>
          <div className="app__right-column">
            <ChatRoom
              chatRoomData={selectedChatRoomData}
              messages={selectedChatRoomMessages}
              currentUser={currentUser}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
