import React, { Component } from "react";

import ChatRoomList from "./ChatRoomList/ChatRoomList";

class App extends Component {
  state = {
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
    return [<ChatRoomList chatRooms={this.state.chatRooms} />];
  }
}

export default App;
