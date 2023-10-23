import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const logIn = createAsyncThunk(
  'login',
  async (credentials, { rejectWithValue }) => {
    try {
      let { data } = await axios.post(
        'http://localhost:3001/api/auth/login',
        credentials
      );
      console.log('inside logIn thunk', data);
      localStorage.setItem('token', data.token);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const attemptTokenLogin = createAsyncThunk(
  'attemptTokenLogin',
  async (x, { rejectWithValue }) => {
    try {
      const token = window.localStorage.getItem('token');
      if (!token) return {};
      const { data } = await axios.get('http://localhost:3001/api/auth', {
        headers: {
          authorization: token,
        },
      });
      return { data, token };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    userAuth: {},
    error: '',
    status: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logIn.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.status = 'success';
        state.error = '';
      })
      .addCase(logIn.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(logIn.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload.message;
      })
      .addCase(attemptTokenLogin.fulfilled, (state, { payload }) => {
        state.userAuth = payload.data;
        state.status = 'success';
        state.error = '';
        state.token = payload.token;
      })
      .addCase(attemptTokenLogin.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(attemptTokenLogin.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload.message;
      });
  },
});

export const selectAuth = (state) => {
  state.auth;
};

export default authSlice.reducer;
