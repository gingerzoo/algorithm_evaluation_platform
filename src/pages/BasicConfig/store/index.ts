import { subs } from "@/assets/data/local_data";
import { IrootState } from "@/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import {
  commitData,
  getAfDelAlgoList,
  getAlogrithmName,
  getDocker,
  getSystemOverview
} from "../service";

export type Isystem = {
  status: number;
  model_name: string;
  default_cmd: string;
  scene: number;
  default_data_path: string;
};

export type Ialgo = {
  dataType: string[];
  default_cmd: string;
  description: string;
  key_word: string[];
  model_name: string;
  scene: number;
  author: string;
};

interface Iname {
  //索引签名
  [key: string]: string;
  guideName: string;
  navigateName: string;
  remoteName: string;
  voiceName: string;
}

type Iscene = {
  scene: "" | "guide" | "navigate" | "remote" | "voice";
  sceneNum: number;
  selected: boolean;
  nextPath: string;
  nowProcess: string[];
  inputPlace: string;
  dataSet: number;
  dataName: string;
  system: Isystem;
  commit_status: number;
  commit_info: string;
  //   isAsure: boolean;
  inputRun: string;
  algolist: Ialgo[];
  currentModule: string;
  modelNames: Iname;
  curAlgo: Ialgo;
  user_name: string;
  canLogin: boolean;
};
const initialState: Iscene = {
  scene: "remote",
  selected: false,
  sceneNum: 2,
  nextPath: "",
  nowProcess: ["基础配置"],
  inputPlace: ``,
  dataSet: 0,
  dataName: "",
  system: {
    status: -1,
    default_cmd: "",
    model_name: "",
    scene: -1,
    default_data_path: ""
  },
  modelNames: {
    guideName: "",
    navigateName: "",
    remoteName: "",
    voiceName: ""
  },
  commit_status: -1,
  commit_info: "",
  //0代表RGB 1代表近红外 2代表雷达
  //   isAsure: false,
  inputRun: "",
  algolist: [],
  curAlgo: {
    dataType: [],
    default_cmd: "",
    description: "",
    key_word: [],
    model_name: "",
    scene: 0,
    author: ""
  },
  currentModule: "",
  user_name: "",
  canLogin: false
};

export const getSystemAction = createAsyncThunk<
  void,
  string,
  {
    state: IrootState;
  }
>("system_overview", async (par: string, { dispatch, getState }) => {
  dispatch(changeDataNameAction(par));

  try {
    const sceneNum = getState().basicConfig.sceneNum;
    const scene = getState().basicConfig.scene;
    const res = await getSystemOverview(par, sceneNum);
    console.log("拿到系统简况！");
    console.log("system___________", res);
    dispatch(changeSystemAction(res));
    dispatch(changeInputPlaceAction(res.default_cmd));

    dispatch(changeInputRunAction(""));
    dispatch(changeSceneNumAction(sceneNum));
    // const scene = subs[res.scene].link.slice(1);
    dispatch(changeSceneAction(scene));
  } catch (err) {
    message.open({
      type: "error",
      content: "网络请求发生错误",
      duration: 2
    });
    console.log(err);
  }
});

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
>("affirmConfig", async (par, { dispatch, getState }) => {
  try {
    const run_placeholder = getState().basicConfig.inputPlace;
    const run_command = getState().basicConfig.inputRun;
    // const scene = getState().basicConfig.scene;
    const sceneNum = getState().basicConfig.sceneNum;
    const model_name = getState().basicConfig.system.model_name;
    const data_type = getState().basicConfig.dataSet;
    const real_run_cmd = run_command ? run_command : run_placeholder;

    const res = await commitData(real_run_cmd, sceneNum, data_type);
    dispatch(changeStatusCommAction(res.status));
    dispatch(changeInfoCommAction(res.info));
    dispatch(changeInputRunAction(real_run_cmd));
    switch (sceneNum) {
      case 0:
        dispatch(changeGuideModelNameAction(model_name));
        break;
      case 1:
        dispatch(changeNavModelNameAction(model_name));
        break;
      case 2:
        dispatch(changeRemoteModelNameAction(model_name));
        break;
      case 3:
        dispatch(changeVoiceModelNameAction(model_name));
        break;
      default:
        break;
    }
    console.log("数据配置成功");
    //这个回调函数返回一个promise
    return {
      isAsure: res.status,
      info: res.info
    };
  } catch (err) {
    return {
      isAsure: 1,
      info: "网络错误"
    };
  }
});

export const getAftDelAlgListAction = createAsyncThunk(
  "delete_alogrithmList",
  async (par: string, { dispatch }) => {
    try {
      const res = await getAfDelAlgoList(par);
      dispatch(changeAlgoListAction(res.model_name));
    } catch (err) {
      message.open({
        type: "error",
        content: "网络错误",
        duration: 2
      });
    }
  }
);

export const getAlogListAction = createAsyncThunk<
  void,
  void,
  {
    state: IrootState;
  }
>("alogrithmList", (par, { dispatch, getState }) => {
  try {
    const sceneNum = getState().basicConfig.sceneNum;
    getAlogrithmName(sceneNum).then((res) => {
      dispatch(changeAlgoListAction(res));
      console.log("alo-lidt1", res);
    });
  } catch (err) {
    //   alert(`网络连接错误,请检查网络设置:${err}`);
    message.open({
      type: "error",
      content: "网络错误",
      duration: 2
    });
  }
});

export const getDockerAction = createAsyncThunk<
  void,
  FormData,
  {
    state: IrootState;
  }
>("push_docker", async (par: FormData, { dispatch }) => {
  try {
    const res = await getDocker(par);
    dispatch(getAlogListAction());

    if (res == "success") {
      console.log("生成docker成功");
      message.open({
        type: "success",
        content: "加载docker包成功",
        duration: 2
      });
    } else {
      message.open({
        type: "error",
        content: "生成docker包失败",
        duration: 2
      });
    }
  } catch (err) {
    message.open({
      type: "error",
      content: "网络请求发生错误",
      duration: 2
    });
    console.log(err);
  }
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
    changeSelectedSceneAction(state, { payload }) {
      state.selected = payload;
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
    // changeIsAsureAction(state, { payload }) {
    //   state.isAsure = payload;
    // },
    changeAlgoListAction(state, { payload }) {
      state.algolist = payload;
    },
    changeCurModuleAction(state, { payload }) {
      state.currentModule = payload;
    },
    changeNavModelNameAction(state, { payload }) {
      state.modelNames.navigateName = payload;
    },
    changeRemoteModelNameAction(state, { payload }) {
      state.modelNames.remoteName = payload;
    },
    changeGuideModelNameAction(state, { payload }) {
      state.modelNames.guideName = payload;
    },
    changeVoiceModelNameAction(state, { payload }) {
      state.modelNames.voiceName = payload;
    },
    changeCurAlgoAction(state, { payload }) {
      state.curAlgo = payload;
    },
    changeUserNameAction(state, { payload }) {
      state.user_name = payload;
    },
    changeCanLoginAction(state, { payload }) {
      state.canLogin = payload;
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
  changeAlgoListAction,
  changeCurModuleAction,
  changeGuideModelNameAction,
  changeNavModelNameAction,
  changeRemoteModelNameAction,
  changeVoiceModelNameAction,
  changeSelectedSceneAction,
  changeCurAlgoAction,
  changeUserNameAction,
  changeCanLoginAction
} = sceneSlice.actions;

export default sceneSlice.reducer;
