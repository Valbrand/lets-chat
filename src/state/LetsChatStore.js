import { observable, action } from "mobx";

export default class LetsChatStore {
  @observable chatRooms = {};
  @observable currentUser = null;
  @observable messages = [];
  @observable selectedChatRoom = null;

  @action
  selectChatRoom = roomId => {
    this.messages = [];
    this.selectedChatRoom = roomId;
  };
}
