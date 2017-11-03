// Action types
const ADD_MESSAGE = "lets-chat/ADD_MESSAGE";

// Action creators
export function addMessage(message) {
  return {
    type: ADD_MESSAGE,
    payload: {
      message
    }
  };
}

// Reducer
export default function messagesReducer(state = null, action) {
  switch (action.type) {
    case ADD_MESSAGE:
      if (state === null) {
        return [action.payload.message];
      } else {
        return [...state, action.payload.message];
      }
    default:
      return state;
  }
}
