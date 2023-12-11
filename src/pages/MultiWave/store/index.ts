import { createSlice } from "@reduxjs/toolkit";
import { IbasicRes, Iguid, Inav, Iremo, Ivoice } from "@/type";
import { postMultiWaveAction } from "../service";

export type data_path = {
  rgb: string;
  infrared: string;
  sar: string;
  data: string[];
};
//定义state的数据类型
interface Iprops {
  [index: string]:
    | number
    | string
    | Iguid
    | Inav
    | Iremo
    | Ivoice
    | boolean
    | IbasicRes
    | string[]
    | number[];
  run_status: number;
  run_info: string;
  guide: IbasicRes;
  navigate: IbasicRes;
  remote: IbasicRes;
  voice: IbasicRes;
  isPending: boolean;
  population_score: number;
  rgb: string;
  infrared: string;
  sar: string;
  data: string[];
  reality: string;
  info_ret: string;
}

//对state进行初始化
const initialState: Iprops = {
  guide: {
    score: [80.5, 50, 70.2, 75],
    status: [1, 2, 1, 1]
  },

  navigate: {
    score: [47, 57, 62, 40],
    status: [1, 1, 1, 1]
  },

  remote: {
    score: [0, 0, 0, 0],
    status: [1, 2, 1, 1]
  },

  voice: {
    score: [0, 0, 0, 0],
    status: [1, 2, 1, 1]
  },
  run_status: -1,
  run_info: "",
  isPending: false,
  population_score: 0,

  rgb: "",
  infrared: "",
  sar: "",
  data: ["可见光", "红外", "雷达"],
  reality: "",
  info_ret: ""
};

//创建Slice
const MlutiwaveSlice = createSlice({
  //名称
  name: "multiWave_slice",
  //state初始值
  initialState,
  //改变state值的函数
  reducers: {
    changeRgbPath(state, { payload }) {
      state.rgb = payload;
    },
    changeInfraredPath(state, { payload }) {
      state.infrared = payload;
    },
    changeSarPath(state, { payload }) {
      state.sar = payload;
    },
    changeDataSets(state, { payload }) {
      state.data = payload;
    },
    changeReality(state, { payload }) {
      state.reality = payload;
    },
    changeInfoRet(state, { payload }) {
      state.info_ret = payload;
    },

    changeMultiGuideAction(state, { payload }) {
      state.guide = payload;
    },
    changeMultiNavigateAction(state, { payload }) {
      state.navigate = payload;
    },
    changeMultiRemoAction(state, { payload }) {
      state.remote = payload;
    },
    changeMultiVoiceAction(state, { payload }) {
      state.voice = payload;
    },
    changeMultiStatusAction(state, { payload }) {
      state.run_status = payload;
    },
    changeMultiInfoAction(state, { payload }) {
      state.run_info = payload;
    },
    changeMultiPopulaAction(state, { payload }) {
      state.population_score = payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(postMultiWaveAction.pending, (state) => {
        state.isPending = true;
      })
      .addCase(postMultiWaveAction.fulfilled, (state) => {
        state.isPending = false;
      })
      .addCase(postMultiWaveAction.rejected, (state) => {
        state.isPending = false;
      });
  }
});

//导出
export const {
  changeRgbPath,
  changeInfraredPath,
  changeSarPath,
  changeDataSets,
  changeReality,
  changeInfoRet,
  changeMultiGuideAction,
  changeMultiNavigateAction,
  changeMultiRemoAction,
  changeMultiVoiceAction,
  changeMultiStatusAction,
  changeMultiInfoAction,
  changeMultiPopulaAction
} = MlutiwaveSlice.actions;

export default MlutiwaveSlice.reducer;
