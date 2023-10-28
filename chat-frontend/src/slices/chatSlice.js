import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {},
  reducers: {},
});

export const selectChat = (state) => state.chat;

export default chatSlice.reducer;
