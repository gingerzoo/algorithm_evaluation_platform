import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { IrootState } from "@/store";
import {
  getDatasetInfo,
  getUploadDataset,
  getUploadDatasetInfo
} from "../service";

export type Idataset = {
  name: string;
  status: string;
  label_num: number;
  sample_num: number;
  sample_labled: number;
  label_all: number;
  dateset_name: string;
  dateset_info: string;
  scene_num: number;
};

export type Ibuild_data = {
  data_name: string;
  data_type: number;
  scene: number;
  info: string;
};

export interface Idatasets {
  datasets: Idataset[];
  buildData: Ibuild_data;
  isUploading: boolean;
}
const initialState: Idatasets = {
  datasets: [],
  buildData: {
    data_name: "你好",
    data_type: 0,
    scene: 0,
    info: "你好世界"
  },
  isUploading: false
};

export const getDatasetInfoAction = createAsyncThunk(
  "getdatasets",
  async (par, { dispatch }) => {
    const res = await getDatasetInfo();
    console.log("数据库信息", res);
    dispatch(changeDatasetsInfoAction(res));
  }
);

export const getUploadDatasetAction = createAsyncThunk<
  void,
  FormData,
  {
    state: IrootState;
  }
>("upload_dataset", async (par, { getState, dispatch }) => {
  try {
    const dataset_info = getState().datasetMan.buildData;
    const { data_name, data_type, scene, info } = dataset_info;

    const res0 = await getUploadDatasetInfo(data_name, data_type, scene, info);

    dispatch(getDatasetInfoAction());

    const res = await getUploadDataset(par);

    console.log("数据集上传成功！！！！");
    if (res0 == "success" && res == "success") {
      console.log("上传数据集成功");
      message.open({
        type: "success",
        content: "上传数据集成功",
        duration: 2
      });
    } else {
      message.open({
        type: "error",
        content: "上传数据集失败",
        duration: 2
      });
    }
  } catch (err) {
    message.open({
      type: "error",
      content: "网络请求发生错误",
      duration: 2
    });
  }
});

const datasetSlice = createSlice({
  name: "dataset",
  initialState: initialState,
  reducers: {
    changeDatasetsInfoAction(state, { payload }) {
      state.datasets = payload;
    },
    changeBuildDataAction(state, { payload }) {
      state.buildData = payload;
    },
    changeIsLoadingAction(state, { payload }) {
      state.isUploading = payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUploadDatasetAction.pending, (state) => {
        state.isUploading = true;
      })
      .addCase(getUploadDatasetAction.fulfilled, (state) => {
        state.isUploading = false;
      })
      .addCase(getUploadDatasetAction.rejected, (state) => {
        state.isUploading = false;
      });
  }
});

export default datasetSlice.reducer;

export const {
  changeDatasetsInfoAction,
  changeBuildDataAction,
  changeIsLoadingAction
} = datasetSlice.actions;
