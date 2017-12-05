import { createFirebaseAuthService } from "../firebase/authService/authService";

export function createAuthService() {
  return createFirebaseAuthService();
}
