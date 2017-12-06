import { changeUser } from "./currentUser/currentUser";

export function createReduxStoreService(store) {
  return {
    changeUser(user) {
      store.dispatch(changeUser(user));
    }
  };
}
