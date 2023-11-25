import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/users/usersSlice";
import accountReducer from "../slice/accounts/accountsSlice";
import transactionsReducer from "../slice/transactions/transactionSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
    accounts: accountReducer,
    transactions: transactionsReducer,
  },
});

export default store;
