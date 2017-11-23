// Action types
const CHANGE_USER = "lets-chat/CHANGE_USER";

// Action creators
export function changeUser(user) {
  return {
    type: CHANGE_USER,
    payload: {
      user
    }
  };
}

export const actionCreators = {
  changeUser
};

// Reducer
export default function currentUserReducer(state = null, action) {
  switch (action.type) {
    case CHANGE_USER:
      return action.payload.user;
    default:
      return state;
  }
}
