import { clearMessages } from "../messages/messages";

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

export const chatRoomSelectionMiddleware = store => next => action => {
  next(action);

  if (typeof action === "object" && action.type === SELECT_CHAT_ROOM) {
    store.dispatch(clearMessages());
  }
};
