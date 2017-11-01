import React, { Component } from "react";

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
      <div>
        <ChatRoomList chatRooms={this.state.chatRooms} />
        <ChatRoom
          chatRoomData={selectedChatRoomData}
          messages={selectedChatRoomMessages}
        />
      </div>
    );
  }
}

export default App;
