export function createAppViewModel(state) {
  const { currentUser } = state;

  return {
    shouldShowChatInterface: currentUser != null
  };
}
