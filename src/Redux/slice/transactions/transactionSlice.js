import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

const initialState = {
  Transactions: [],
  transaction: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
};

export const createTransactionAction = createAsyncThunk(
  "transaction/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { name, transactionType, amount, category, notes } = payload;
    console.log(payload);
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.post(
        `${baseURL}/transactions`,
        {
          name,
          transactionType,
          amount,
          category,
          notes,
          account: payload.id,
        },
        config
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const updateTransactionAction = createAsyncThunk(
  "transaction/edit",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { name, transactionType, amount, category, notes, id } = payload;
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.put(
        `${baseURL}/transactions/${id}`,
        {
          name,
          transactionType,
          amount,
          category,
          notes,
          id,
        },
        config
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const getSingleTransactionAction = createAsyncThunk(
  "transaction/get-transaction",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get(`${baseURL}/transactions/${id}`, config);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createTransactionAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createTransactionAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isAdded = true;
      state.transaction = action.payload;
    });
    builder.addCase(createTransactionAction.rejected, (state, action) => {
      state.loading = false;
      state.isAdded = false;
      state.transaction = {};
      state.error = action.payload;
    });

    //edit transaction
    builder.addCase(updateTransactionAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateTransactionAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isUpdated = true;
      state.transaction = action.payload;
    });
    builder.addCase(updateTransactionAction.rejected, (state, action) => {
      state.loading = false;
      state.isUpdated = false;
      state.transaction = {};
      state.error = action.payload;
    });

    //get single transaction
    builder.addCase(getSingleTransactionAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSingleTransactionAction.fulfilled, (state, action) => {
      state.loading = false;
      state.transaction = action.payload;
    });
    builder.addCase(getSingleTransactionAction.rejected, (state, action) => {
      state.loading = false;
      state.transaction = {};
      state.error = action.payload;
    });
  },
});

const transactionsReducer = transactionSlice.reducer;
export default transactionsReducer;
