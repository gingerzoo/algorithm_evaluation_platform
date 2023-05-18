import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDatasetInfo } from "../service";

export type Idataset = {
  name: string;
  status: string;
  label_num: number;
  sample_num: number;
  sample_labled: number;
  label_all: number;
};

export interface Idatasets {
  datasets: Idataset[];
}
const initialState: Idatasets = {
  datasets: []
};

export const getDatasetInfoAction = createAsyncThunk(
  "getdatasets",
  async (par, { dispatch }) => {
    const res = await getDatasetInfo();
    dispatch(changeDatasetsInfoAction(res));
  }
);

const datasetSlice = createSlice({
  name: "dataset",
  initialState: initialState,
  reducers: {
    changeDatasetsInfoAction(state, { payload }) {
      state.datasets = payload;
    }
  }
});

export default datasetSlice.reducer;

export const { changeDatasetsInfoAction } = datasetSlice.actions;
