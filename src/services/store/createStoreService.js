import { createReduxStoreService } from "../../state/createReduxStoreService";

export function createStoreService(store) {
  const reduxStoreService = createReduxStoreService(store);

  return {
    changeUser: reduxStoreService.changeUser,
    addMessages: reduxStoreService.addMessages
  };
}
