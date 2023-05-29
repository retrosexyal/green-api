import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { DataStatus } from "../../constants/constants";

const initialState = {
  result: false,
  status: DataStatus.Loaded,
};

export const fetchDeleteData = createAsyncThunk(
  "deleteDat/setDeleteData",
  async (payload: {
    idInstance: string;
    apiTokenInstance: string;
    id: number;
  }) => {
    const { idInstance, apiTokenInstance, id } = payload;
    const responce = await axios.delete(
      `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${id}`
    );
    const data = await responce.data;
    return data as boolean;
  }
);

const deleteData = createSlice({
  name: "deleteData",
  initialState,
  reducers: {
    setDeleteData(state, action: PayloadAction<boolean>) {
      state.result = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeleteData.pending, (state) => {
        state.status = DataStatus.Loading;
      })
      .addCase(
        fetchDeleteData.fulfilled,
        (state, action: PayloadAction<boolean>) => {
          state.result = action.payload;
          state.status = DataStatus.Loaded;
        }
      )
      .addCase(fetchDeleteData.rejected, (state) => {
        state.status = DataStatus.Error;
      });
  },
});

export const { setDeleteData } = deleteData.actions;

export const deleteReducer = deleteData.reducer;
