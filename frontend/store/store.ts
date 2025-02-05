import { configureStore } from "@reduxjs/toolkit";

import { messagesApi } from "./messagesApi";

export const apiReducers = {
  [messagesApi.reducerPath]: messagesApi.reducer,
};

export const store = configureStore({
  reducer: apiReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(messagesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
