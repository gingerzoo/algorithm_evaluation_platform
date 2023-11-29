import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IrootState } from "@/store";
import { runpy2, findData, runpy1 } from "../services";

export type ItableData = {
  key: string;
  value: string;
};

export interface collaAwareType {
  tableData: ItableData[];
}

const initialState: collaAwareType = {
  tableData: []
};

const collaAwareSlice = createSlice({
  name: "collaAwareSlice",
  initialState,
  reducers: {
    changeDataAction(state, { payload }) {
      state.tableData = payload;
    }
  }
});

export const findDataAction = createAsyncThunk<
  void,
  void,
  { state: IrootState }
>("findData", async (_, { dispatch }) => {
  const res = await findData();
  dispatch(changeDataAction(res));
});

export const runpy1Action = createAsyncThunk("runpy1", async () => {
  const res = await runpy1();
});

export const runpy2Action = createAsyncThunk("runpy2", async () => {
  const res = await runpy2();
});

export default collaAwareSlice.reducer;

export const { changeDataAction } = collaAwareSlice.actions;
