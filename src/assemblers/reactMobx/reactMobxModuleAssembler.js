import React from "react";
import { Observer } from "mobx-react";
import { storeInstance } from "../../state/LetsChatStore";

export function reactMobxModuleAssembler(viewModelFactory, controller, View) {
  return {
    render() {
      return (
        <Observer>
          {() => {
            const viewModel = viewModelFactory(storeInstance());

            return <View {...viewModel} {...controller} />;
          }}
        </Observer>
      );
    }
  };
}
