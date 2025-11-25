import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatState {
  messages: string[];
}
const initialState: ChatState = { messages: [] };

const slice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<string>) {
      state.messages.push(action.payload);
    },
    clearMessages(state) {
      state.messages = [];
    },
  },
});
export const { addMessage, clearMessages } = slice.actions;
export default slice.reducer;
