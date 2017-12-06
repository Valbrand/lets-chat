export function createChatRoomViewModel(state) {
  const { selectedChatRoom, chatRooms, messages, currentUser } = state;

  const selectedChatRoomData =
    selectedChatRoom === null ? null : chatRooms[selectedChatRoom];

  return {
    chatRoomData: selectedChatRoomData,
    messages,
    currentUser: currentUser
  };
}
