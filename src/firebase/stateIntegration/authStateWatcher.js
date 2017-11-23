import createAuthService from "../authService/authService";

export function createAuthStateWatcher(storeService) {
  const authService = createAuthService();

  return {
    start() {
      authService.authenticate().then(userId => {
        authService.observeAuthState(userId, user => {
          storeService.changeUser(user);
        });
      });
    }
  };
}
