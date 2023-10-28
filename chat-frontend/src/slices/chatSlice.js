import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// need to get a logged in users' active chats
export const getChats = createAsyncThunk(
  'getChats',
  async (userId, { rejectWithValue }) => {
    try {
      let { data } = await axios.get(
        `http://localhost:3001/api/chats/user/${userId}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chats: [],
    status: '',
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getChats.fulfilled, (state, { payload }) => {
      state.chats = payload;
    });
    builder.addCase(getChats.pending, (state) => {
      state.status = 'loading';
      state.error = '';
    });
    builder.addCase(getChats.rejected, (state, { payload }) => {
      state.status = 'failed';
      state.error = payload.message;
    });
  },
});

export const selectChat = (state) => state.chat;

export default chatSlice.reducer;
