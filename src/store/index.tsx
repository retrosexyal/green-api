import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { authReducer } from "./slices/loginSlice";
import { historyReducer } from "./slices/historySlice";
import { sendReducer } from "./slices/sendSlice";
import { getReducer } from "./slices/getSlice";
import { deleteReducer } from "./slices/deleteSlice";
import { phoneReducer } from "./slices/phoneSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    history: historyReducer,
    send: sendReducer,
    get: getReducer,
    del: deleteReducer,
    phone: phoneReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AddDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
