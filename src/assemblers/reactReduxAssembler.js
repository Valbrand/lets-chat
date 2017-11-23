import React from "react";
import { connect } from "react-redux";

const injectController = controller => (
  stateProps,
  dispatchProps,
  ownProps
) => ({
  ...controller,
  ...ownProps,
  ...stateProps,
  ...dispatchProps
});

export function reactReduxAssembler(viewModelFactory, controller, view) {
  const AssembledModule = connect(
    viewModelFactory,
    null,
    injectController(controller)
  )(view);

  return {
    render() {
      return <AssembledModule />;
    }
  };
}
