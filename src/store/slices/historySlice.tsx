import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { DataStatus } from "../../constants/constants";
import { IHistoryResponce } from "../../interfaces/interfaces";

const initialState = {
  history: undefined as undefined | IHistoryResponce[],
  status: DataStatus.Loading,
};

export const fetchHistoryData = createAsyncThunk(
  "historyData/setHistoryData",
  async (payload: {
    idInstance: string;
    apiTokenInstance: string;
    phoneNumber: string;
    count?: number;
  }) => {
    const { idInstance, apiTokenInstance, phoneNumber, count } = payload;
    const responce = await axios.post(
      `https://api.green-api.com/waInstance${idInstance}/GetChatHistory/${apiTokenInstance}`,
      {
        chatId: `${phoneNumber}@c.us`,
        count: count,
      }
    );
    const data = await responce.data;
    return data as IHistoryResponce[];
  }
);

const historyData = createSlice({
  name: "historyData",
  initialState,
  reducers: {
    setHistoryData(state, action: PayloadAction<IHistoryResponce[]>) {
      state.history = [...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistoryData.pending, (state) => {
        state.status = DataStatus.Loading;
      })
      .addCase(
        fetchHistoryData.fulfilled,
        (state, action: PayloadAction<IHistoryResponce[]>) => {
          state.history = action.payload;
          state.status = DataStatus.Loaded;
        }
      )
      .addCase(fetchHistoryData.rejected, (state) => {
        state.status = DataStatus.Error;
      });
  },
});

export const { setHistoryData } = historyData.actions;

export const historyReducer = historyData.reducer;
