// Action types
const ADD_MESSAGES = "lets-chat/ADD_MESSAGES";
const CLEAR_MESSAGES = "lets-chat/CLEAR_MESSAGES";

// Action creators
export function addMessages(messages) {
  return {
    type: ADD_MESSAGES,
    payload: {
      messages
    }
  };
}

export function clearMessages() {
  return {
    type: CLEAR_MESSAGES
  };
}

// Reducer
export default function messagesReducer(state = null, action) {
  switch (action.type) {
    case ADD_MESSAGES:
      if (state === null) {
        return action.payload.messages;
      } else {
        return [...state, ...action.payload.messages];
      }
    case CLEAR_MESSAGES:
      return null;
    default:
      return state;
  }
}
