import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { nobietyReducer } from "./nobietySlice";

export const store = configureStore({
  reducer: {
    nobietyReducer: nobietyReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false,
  }),
});
