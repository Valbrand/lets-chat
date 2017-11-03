// Action types
const ADD_MESSAGES = "lets-chat/ADD_MESSAGES";

// Action creators
export function addMessages(messages) {
  return {
    type: ADD_MESSAGES,
    payload: {
      messages
    }
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
    default:
      return state;
  }
}
