import { subs } from "@/assets/data/local_data";
import { IrootState } from "@/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { commitData, getSystemOverview } from "../service";

export type Isystem = {
  status: number;
  model_name: string;
  default_cmd: string;
  scene: number;
  default_data_path: string;
};

type Iscene = {
  scene: "" | "guide" | "navigate" | "remote" | "voice";
  sceneNum: number;
  nextPath: string;
  nowProcess: string[];
  inputPlace: string;
  dataSet: number;
  dataName: string;
  system: Isystem;
  commit_status: number;
  commit_info: string;
  isAsure: boolean;
  inputRun: string;
};
const initialState: Iscene = {
  scene: "",
  sceneNum: -1,
  nextPath: "",
  nowProcess: ["基础配置"],
  inputPlace: ``,
  dataSet: 0,
  dataName: "",
  system: {
    status: -1,
    default_cmd: "",
    model_name: "我的项目名称",
    scene: -1,
    default_data_path: ""
  },
  commit_status: -1,
  commit_info: "",
  //0代表RGB 1代表近红外 2代表雷达
  isAsure: false,
  inputRun: ""
};

export const getSystemAction = createAsyncThunk(
  "system_overview",
  async (par: string, { dispatch }) => {
    dispatch(changeDataNameAction(par));
    try {
      const res = await getSystemOverview(par);
      console.log(res);
      dispatch(changeSystemAction(res));
      dispatch(changeInputPlaceAction(res.default_cmd));
      console.log("拿到系统简况！");
      dispatch(changeInputRunAction(""));
      dispatch(changeSceneNumAction(res.scene));
      const scene = subs[res.scene].link.slice(1);
      dispatch(changeSceneAction(scene));
      console.log("洒洒水啦");
    } catch (err) {
      message.open({
        type: "error",
        content: "网络请求发生错误",
        duration: 2
      });
      console.log(err);
    }
  }
);

export const commitDataAction = createAsyncThunk<
  //返回值的类型！！！！！一定要写啊啊啊啊！
  {
    isAsure: number;
    info: string;
  },
  void,
  {
    state: IrootState;
  }
>("effectResult", async (par, { dispatch, getState }) => {
  const run_placeholder = getState().basicConfig.inputPlace;
  const run_command = getState().basicConfig.inputRun;
  const real_run_cmd = run_command ? run_command : run_placeholder;

  const scene = getState().basicConfig.sceneNum;
  const data_type = getState().basicConfig.dataSet;

  const res = await commitData(real_run_cmd, scene, data_type);
  dispatch(changeStatusCommAction(res.status));
  dispatch(changeInfoCommAction(res.info));
  dispatch(changeInputRunAction(real_run_cmd));
  console.log("数据配置成功");
  //这个回调函数返回一个promise
  return {
    isAsure: res.status,
    info: res.info
  };
});

const sceneSlice = createSlice({
  name: "sceneslice",
  initialState,
  reducers: {
    changeSceneAction(state, { payload }) {
      state.scene = payload;
    },
    changeSceneNumAction(state, { payload }) {
      state.sceneNum = payload;
    },
    changeNextPathAction(state, { payload }) {
      state.nextPath = payload;
    },
    changeNowProcessAction(state, { payload }) {
      state.nowProcess = payload;
    },
    changeInputPlaceAction(state, { payload }) {
      state.inputPlace = payload;
    },
    changeInputRunAction(state, { payload }) {
      state.inputRun = payload;
    },
    changeDataSetAction(state, { payload }) {
      state.dataSet = payload;
    },
    changeDataNameAction(state, { payload }) {
      state.dataName = payload;
    },
    changeSystemAction(state, { payload }) {
      state.system = payload;
    },
    changeStatusCommAction(state, { payload }) {
      state.commit_status = payload;
    },
    changeInfoCommAction(state, { payload }) {
      state.commit_info = payload;
    },
    changeIsAsureAction(state, { payload }) {
      state.isAsure = payload;
    }
  }
});

export const {
  changeSceneAction,
  changeSceneNumAction,
  changeNextPathAction,
  changeNowProcessAction,
  changeInputPlaceAction,
  changeInputRunAction,
  changeDataSetAction,
  changeDataNameAction,
  changeSystemAction,
  changeInfoCommAction,
  changeStatusCommAction,
  changeIsAsureAction
} = sceneSlice.actions;

export default sceneSlice.reducer;
