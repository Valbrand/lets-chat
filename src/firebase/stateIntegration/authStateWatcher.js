import createAuthService from "../authService/authService";
import { changeUser } from "../../state/currentUser/currentUser";

export function createAuthStateWatcher(store) {
  const authService = createAuthService();

  return {
    start() {
      authService.authenticate().then(userId => {
        authService.observeAuthState(userId, user => {
          store.dispatch(changeUser(user));
        });
      });
    }
  };
}
