import { action, extendObservable, observable } from "mobx";

export default class LetsChatStore {
  constructor() {
    extendObservable(this, {
      _chatRooms: observable.map({}),
      get chatRooms() {
        return this._chatRooms.toJS();
      },

      currentUser: null,
      messages: null,
      selectedChatRoom: null,

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
        this._chatRooms.set(roomId, room);
      }),
      removeChatRoom: action(roomId => {
        this._chatRooms.delete(roomId);
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
