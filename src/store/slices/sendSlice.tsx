import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { DataStatus } from "../../constants/constants";

const initialState = {
  idMessage: "",
  status: DataStatus.Loaded,
  error: undefined as undefined | string,
};

export const fetchSendData = createAsyncThunk(
  "sendData/setSendData",
  async (payload: {
    idInstance: string;
    apiTokenInstance: string;
    phoneNumber: string;
    message: string;
  }) => {
    const { idInstance, apiTokenInstance, phoneNumber, message } = payload;
    const responce = await axios.post(
      `https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`,
      {
        chatId: `${phoneNumber}@c.us`,
        message: message,
      }
    );
    const { idMessage } = await responce.data;
    return idMessage as string;
  }
);

const sendData = createSlice({
  name: "sendData",
  initialState,
  reducers: {
    setSendData(state, action: PayloadAction<string>) {
      state.idMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSendData.pending, (state) => {
        state.status = DataStatus.Loading;
      })
      .addCase(
        fetchSendData.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.idMessage = action.payload;
          state.status = DataStatus.Loaded;
        }
      )
      .addCase(fetchSendData.rejected, (state, action) => {
        state.status = DataStatus.Error;
        state.error = action.error.message;
      });
  },
});

export const { setSendData } = sendData.actions;

export const sendReducer = sendData.reducer;
