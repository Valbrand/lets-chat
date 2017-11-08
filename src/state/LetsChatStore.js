import { action, extendObservable } from "mobx";

export default class LetsChatStore {
  constructor() {
    extendObservable(this, {
      chatRooms: {},
      currentUser: null,
      messages: [],
      selectedChatRoom: null,

      selectChatRoom: action(roomId => {
        if (roomId !== this.selectedChatRoom) {
          this.messages = [];
        }
        this.selectedChatRoom = roomId;
      }),
      changeUser: action(user => {
        this.currentUser = user;
      }),
      addChatRoom: action((roomId, room) => {
        this.chatRooms[roomId] = room;
      }),
      removeChatRoom: action(roomId => {
        this.chatRooms[roomId] = undefined;
      })
    });
  }
}
