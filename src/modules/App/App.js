import { moduleAssembler } from "../../assemblers/moduleAssembler";
import AppView from "../../views/AppView/AppView";

function createAppViewModel(state) {
  const { currentUser } = state;

  return {
    shouldShowChatInterface: currentUser != null
  };
}

function createAppController(messagesService, chatRoomService, storeService) {
  return {
    messagesService,
    chatRoomService,
    storeService
  };
}

export function createAppModule(
  chatRoomService,
  messagesService,
  storeService
) {
  const appController = createAppController(
    messagesService,
    chatRoomService,
    storeService
  );

  return moduleAssembler(createAppViewModel, appController, AppView);
}
