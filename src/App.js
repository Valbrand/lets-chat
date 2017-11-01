import React, { Component } from "react";

import "./App.css";
import ChatRoomList from "./ChatRoomList/ChatRoomList";
import ChatRoom from "./ChatRoom/ChatRoom";

class App extends Component {
  state = {
    selectedChatRoom: null,

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
    const { selectedChatRoom, chatRooms, messages } = this.state;

    const selectedChatRoomData =
      selectedChatRoom === null ? null : chatRooms[selectedChatRoom];
    const selectedChatRoomMessages =
      selectedChatRoom === null ? null : messages[selectedChatRoom];

    return (
      <div className="app-root">
        <div className="chat-container">
          <div className="left-column">
            <ChatRoomList chatRooms={this.state.chatRooms} />
          </div>
          <div className="right-column">
            <ChatRoom
              chatRoomData={selectedChatRoomData}
              messages={selectedChatRoomMessages}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
