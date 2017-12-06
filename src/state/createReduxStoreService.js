import { changeUser } from "./currentUser/currentUser";
import { addMessages } from "./messages/messages";

export function createReduxStoreService(store) {
  return {
    changeUser(user) {
      store.dispatch(changeUser(user));
    },

    addMessages(messages) {
      store.dispatch(addMessages(messages));
    }
  };
}
