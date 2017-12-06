import { reactReduxModuleAssembler } from "./reactRedux/reactReduxAssembler";

export function moduleAssembler(viewModelFactory, controller, view) {
  return reactReduxModuleAssembler(viewModelFactory, controller, view);
}
