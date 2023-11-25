import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

const initialState = {
  loading: false,
  error: null,
  users: [],
  user: {},
  profile: {},
  userAuth: {
    loading: false,
    error: null,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : {},
  },
};

export const registerUserAction = createAsyncThunk(
  "user/register",
  async (
    { fullname, email, password },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      //header
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        `${baseURL}/users/register`,
        {
          fullname,
          email,
          password,
        },
        config
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const loginUserAction = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue, getState, dispatch }) => {
    try {
      //header
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        `${baseURL}/users/login`,
        {
          email,
          password,
        },
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const logoutUserAction = createAsyncThunk("user/logout", async () => {
  localStorage.removeItem("userInfo");
  return null;
});
export const getProfileAction = createAsyncThunk(
  "user/getProfile",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //get token
      const token = getState()?.users?.userAuth?.userInfo?.token;
      // pass to header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      //request
      const { data } = await axios.get(`${baseURL}/users/profile`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    //register
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userAuth.userInfo = action.payload;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.loading = false;
      state.userAuth.error = action.payload;
    });
    //login
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userAuth.userInfo = action.payload;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.loading = false;
      state.userAuth.error = action.payload;
    });
    //logout
    builder.addCase(logoutUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userAuth.userInfo = {};
    });
    //profile
    builder.addCase(getProfileAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getProfileAction.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    });
    builder.addCase(getProfileAction.rejected, (state, action) => {
      state.loading = false;
      state.profile = {};
      state.error = action.payload;
    });
  },
});

//generate reducer

const userReducer = usersSlice.reducer;

export default userReducer;
