import { subs } from "@/assets/data/local_data";
import { IrootState } from "@/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
  inputCom: string;
  dataSet: number;
  dataName: string;
  system: Isystem;
  commit_status: number;
  commit_info: string;
  isAsure: boolean;
};
const initialState: Iscene = {
  scene: "",
  sceneNum: -1,
  nextPath: "",
  nowProcess: ["基础配置"],
  inputCom: ``,
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
  isAsure: false
};

export const getSystemAction = createAsyncThunk(
  "system_overview",
  async (par: string, { dispatch }) => {
    dispatch(changeDataNameAction(par));
    const res = await getSystemOverview(par);
    console.log("拿到系统简况！");
    dispatch(changeSystemAction(res));
    dispatch(changeInputComAction(res.default_cmd));
    dispatch(changeSceneNumAction(res.scene));
    const scene = subs[res.scene].link.slice(1);
    dispatch(changeSceneAction(scene));
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
  const run_cmd = getState().basicConfig.inputCom;
  const scene = getState().basicConfig.sceneNum;
  const data_type = getState().basicConfig.dataSet;
  const res = await commitData(run_cmd, scene, data_type);
  dispatch(changeStatusCommAction(res.status));
  dispatch(changeInfoCommAction(res.info));
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
    changeInputComAction(state, { payload }) {
      state.inputCom = payload;
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
  changeInputComAction,
  changeDataSetAction,
  changeDataNameAction,
  changeSystemAction,
  changeInfoCommAction,
  changeStatusCommAction,
  changeIsAsureAction
} = sceneSlice.actions;

export default sceneSlice.reducer;
