import { createFirebaseAuthService } from "../../firebase/authService/firebaseAuthService";

export function createAuthService() {
  const firebaseAuthService = createFirebaseAuthService();

  return {
    authenticate: firebaseAuthService.authenticate,
    observeAuthState: firebaseAuthService.observeAuthState,
    stopObservingAuthState: firebaseAuthService.stopObservingAuthState
  };
}
