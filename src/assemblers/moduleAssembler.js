import { reactMobxModuleAssembler } from "./reactMobx/reactMobxModuleAssembler";

export function moduleAssembler(viewModelFactory, controller, view) {
  return reactMobxModuleAssembler(viewModelFactory, controller, view);
}
