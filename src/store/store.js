import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import servicesReducer from "./servicesSlice";
import bannersReducer from "./bannersSlice";
import balanceReducer from "./balanceSlice";
import profileReducer from "./profileSlice";
import showBalanceReducer from "./showBalanceSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    services: servicesReducer,
    banners: bannersReducer,
    balance: balanceReducer,
    profile: profileReducer,
    showBalance: showBalanceReducer,
  },
});

export default store;
