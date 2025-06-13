import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: null,
  token: localStorage.getItem("token") || null,
};

const baseUrl = "https://3fd5pjgv-3000.asse.devtunnels.ms/api/";

export const LoginAdmin = createAsyncThunk(
  "user/LoginAdmin",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, {
        username: user.username,
        password: user.password,
      });

      console.log(response.data);

      return {
        user: response.data.user,
        token: response.data.token,
      };
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
    logout: (state) => {
      (state.user = null),
        (state.token = null),
        (state.user = null),
        (state.user = null),
        localStorage.removeItem("token"),
        localStorage.removeItem("user");
    },
  },

  extraReducers: (builder) => {
    builder.addCase(LoginAdmin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(LoginAdmin.fulfilled, (state, action) => {
      (state.isLoading = false),
        (state.isSuccess = true),
        (state.user = action.payload),
        localStorage.setItem("user", JSON.stringify(action.payload.user)),
        localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(LoginAdmin.rejected, (state, action) => {
      (state.isLoading = false),
        (state.isError = false),
        (state.message = action.payload);
    });
  },
});

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;
