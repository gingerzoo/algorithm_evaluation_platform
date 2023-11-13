import { IrootState } from "@/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type Ihome = {
  user_name: string;
  can_login: boolean;
  remember: boolean;
  password: string;
};

const initialState: Ihome = {
  user_name: "",
  can_login: false,
  remember: true,
  password: ""
};

// const getUsernameAction=createAsyncThunk("")

const homeSlice = createSlice({
  name: "homeSlice",
  initialState,
  reducers: {
    changeUserNameAction(state, { payload }) {
      state.user_name = payload;
    },
    changeCanLoginAction(state, { payload }) {
      state.can_login = payload;
    },
    changePasswordAction(state, { payload }) {
      state.password = payload;
    },
    changeRememberAction(state, { payload }) {
      state.remember = payload;
    }
  }
});

export const {
  changeCanLoginAction,
  changeUserNameAction,
  changePasswordAction,
  changeRememberAction
} = homeSlice.actions;

export default homeSlice.reducer;
