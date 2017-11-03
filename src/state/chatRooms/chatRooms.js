// Action types
const ADD_CHAT_ROOM = "lets-chat/ADD_CHAT_ROOM";

// Action creators
export function addChatRoom(id, roomData) {
  return {
    type: ADD_CHAT_ROOM,
    payload: {
      id,
      roomData
    }
  };
}

export default function chatRoomsReducer(state = {}, action) {
  switch (action.type) {
    case ADD_CHAT_ROOM:
      const { id, roomData } = action.payload;
      return { ...state, [id]: roomData };
    default:
      return state;
  }
}
