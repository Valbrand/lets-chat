import { action, extendObservable, observable } from "mobx";

export default class LetsChatStore {
  constructor() {
    extendObservable(this, {
      chatRooms: observable.map({}),
      currentUser: null,
      messages: null,
      selectedChatRoom: null,

      get chatRoomList() {
        return this.chatRooms
          .values()
          .sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0));
      },

      selectChatRoom: action(roomId => {
        if (roomId !== this.selectedChatRoom) {
          this.messages = null;
        }
        this.selectedChatRoom = roomId;
      }),
      changeUser: action(user => {
        this.currentUser = user;
      }),
      addChatRoom: action((roomId, room) => {
        this.chatRooms.set(roomId, room);
      }),
      removeChatRoom: action(roomId => {
        this.chatRooms.delete(roomId);
      }),
      addMessages: action(messages => {
        if (this.messages === null) {
          this.messages = messages;
        } else {
          this.messages = this.messages.concat(messages);
        }
      })
    });
  }
}
