import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseURL from "../../../utils/baseURL";
import axios from "axios";

const initialState = {
  account: {},
  accounts: [],
  error: null,
  loading: false,
  success: false,
  isUpdated: false,
};

export const createAccountAction = createAsyncThunk(
  "account/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { name, initialBalance, accountType, notes } = payload;
    try {
      //get token
      const token = getState()?.users?.userAuth?.userInfo?.token;
      //pass to header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.post(
        `${baseURL}/accounts`,
        {
          name,
          accountType,
          initialBalance,
          notes,
        },
        config
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.responce?.message);
    }
  }
);
export const getSingleAccountAction = createAsyncThunk(
  "account/get-details",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      //get token
      const token = getState()?.users?.userAuth?.userInfo?.token;
      //pass to header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get(`${baseURL}/accounts/${id}`, config);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.responce?.message);
    }
  }
);

export const updateAccountAction = createAsyncThunk(
  "account/update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { name, initialBalance, accountType, notes, id } = payload;
    //get token
    try {
      //get token
      const token = getState()?.users?.userAuth?.userInfo?.token;
      //pass to header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.put(
        `${baseURL}/accounts/${id}`,
        {
          name,
          accountType,
          initialBalance,
          notes,
        },
        config
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.responce?.message);
    }
  }
);
const accountsSlice = createSlice({
  name: "account",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createAccountAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createAccountAction.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.account = action.payload;
    });
    builder.addCase(createAccountAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.account = null;
      state.error = action.payload;
    });
    //get single Account
    builder.addCase(getSingleAccountAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSingleAccountAction.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.account = action.payload;
    });
    builder.addCase(getSingleAccountAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.account = {};
      state.error = action.payload;
    });
    // update account
    builder.addCase(updateAccountAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateAccountAction.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.isUpdated = true;
      state.account = action.payload;
    });
    builder.addCase(updateAccountAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.account = null;
      state.isUpdated = false;
      state.error = action.payload;
    });
  },
});

//reducer

const accountReducer = accountsSlice.reducer;
export default accountReducer;
