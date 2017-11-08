import createAuthService from "../authService/authService";

export function createAuthStateWatcher(store) {
  const authService = createAuthService();

  return {
    start() {
      authService.authenticate().then(userId => {
        authService.observeAuthState(userId, user => {
          store.changeUser(user);
        });
      });
    }
  };
}
