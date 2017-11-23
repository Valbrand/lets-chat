import { moduleAssembler } from "../../assemblers/moduleAssembler";
import AppView from "../../views/AppView/AppView";

function createAppViewModel(state) {
  const { currentUser } = state;

  return {
    shouldShowChatInterface: currentUser != null
  };
}

function createAppController(
  authService,
  messagesService,
  chatRoomService,
  storeService
) {
  return {
    observeAuthState() {
      authService.authenticate().then(userId => {
        authService.observeAuthState(userId, user => {
          storeService.changeUser(user);
        });
      });
    },
    stopObservingAuthState: authService.stopObservingAuthState,

    messagesService,
    chatRoomService,
    storeService
  };
}

export function createAppModule(
  authService,
  chatRoomService,
  messagesService,
  storeService
) {
  const appController = createAppController(
    authService,
    messagesService,
    chatRoomService,
    storeService
  );

  return moduleAssembler(createAppViewModel, appController, AppView);
}
