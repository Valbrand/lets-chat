import { createAuthService } from "../../services/auth/createAuthService";

export function createAppController(storeService) {
  const authService = createAuthService();

  return {
    observeAuthState() {
      authService.authenticate().then(userId => {
        authService.observeAuthState(userId, user => {
          storeService.changeUser(user);
        });
      });
    },

    stopObservingAuthState: authService.stopObservingAuthState
  };
}
