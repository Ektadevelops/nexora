import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import { nexoraApi } from "./api/nexoraApi";

const store = configureStore({
  reducer: {
    auth: authReducer,

    [nexoraApi.reducerPath]: nexoraApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(nexoraApi.middleware),
});

export default store;
