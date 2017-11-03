// Action types
const ADD_CHAT_ROOM = "lets-chat/ADD_CHAT_ROOM";
const REMOVE_CHAT_ROOM = "lets-chat/REMOVE_CHAT_ROOM";

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

export function removeChatRoom(...ids) {
  return {
    type: REMOVE_CHAT_ROOM,
    payload: {
      idsToRemove: ids
    }
  };
}

export default function chatRoomsReducer(state = {}, action) {
  switch (action.type) {
    case ADD_CHAT_ROOM:
      const { id, roomData } = action.payload;
      return { ...state, [id]: roomData };
    case REMOVE_CHAT_ROOM:
      const { idsToRemove } = action.payload;

      return idsToRemove.reduce((state, id) => {
        return { ...state, [id]: undefined };
      }, state);
    default:
      return state;
  }
}
