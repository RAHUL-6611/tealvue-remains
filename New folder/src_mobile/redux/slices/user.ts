import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  name?: string;
  isAuth: boolean;
  token: string | null;
}

export const initialUserState: User = {
  isAuth: false,
  token: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    updateLogin: (state, action: PayloadAction<User>) => {
      state.isAuth = action.payload.isAuth;
      state.token = action.payload.token;
      state.name = action.payload?.name;
    },
    updateLogout: (state, action: PayloadAction<User>) => {
      state.isAuth = false;
      state.name = '';
    },
  },
});

export const { updateLogin, updateLogout } = userSlice.actions;

export default userSlice.reducer;
