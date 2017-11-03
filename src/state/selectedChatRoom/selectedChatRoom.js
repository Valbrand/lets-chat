// Action types
const SELECT_CHAT_ROOM = "lets-chat/SELECT_CHAT_ROOM";

// Action creators
export function selectChatRoom(roomId) {
  return {
    type: SELECT_CHAT_ROOM,
    payload: {
      roomId
    }
  };
}

// Reducer
export default function selectedChatRoomReducer(state = null, action) {
  switch (action.type) {
    case SELECT_CHAT_ROOM:
      return action.payload.roomId;
    default:
      return state;
  }
}
