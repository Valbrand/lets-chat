import { createAppController } from "./AppController";
import { createAppViewModel } from "./AppViewModel";
import { AppView } from "../../views/AppView/AppView";
import { moduleAssembler } from "../../assemblers/moduleAssembler";

export function createAppModule(storeService) {
  const appController = createAppController(storeService);

  return moduleAssembler(createAppViewModel, appController, AppView);
}
