import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { filesSlice, FilesState } from "./filesSlice";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

export interface RootState {
  files: FilesState;
}

export const store = configureStore({
  reducer: {
    [filesSlice.name]: filesSlice.reducer,
  },
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
