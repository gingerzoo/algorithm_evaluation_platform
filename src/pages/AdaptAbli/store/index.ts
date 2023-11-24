import { AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getAdaptResultImgs,
  getCompareResList,
  getViewPic,
  getWorkCondition,
  getWorkDataset,
  getWorkDefault,
  getWorkResult
} from "../services";
import store, { IrootState } from "@/store";
import { message } from "antd";
import { sceneToNum } from "@/assets/data/local_data";
import { FulfilledAction, Iwork, IworkResult, RejectedAction } from "@/type";

//这是干啥的？？？返回的不同场景下condition的列表
type Icondition = {
  [index: string]: string[];
};

export interface Iadapt {
  //   work: "image" | "voice";
  [index: string]:
    | Iwork[]
    | string[]
    | number[]
    | Icondition
    | boolean
    | number
    | string
    | IworkResult
    | boolean[][]
    | boolean[]
    | Iwork
    | (number | undefined)[]
    | number[][];
  guide: Iwork[];
  navigate: Iwork[];
  remote: Iwork[];
  voice: Iwork[];
  workCondition: Icondition;
  conditionList: string[];
  newWorkObj: Iwork;
  genIsPending: boolean[];
  testIsPending: boolean[];
  genData_status: number;
  workResult: string[];
  needGenData: boolean;
  guideResult: string[];
  navigateResult: string[];
  remoteResult: string[];
  voiceResult: string[];
  guideScore: (number | undefined)[];
  navigateScore: string[];
  remoteScore: string[];
  voiceScore: string[];
  checkList: boolean[][];
  runResult: IworkResult;
  imgUrl: string[];
  picIndex: number;
  pageScene: string;
  populstion_score: number;
  resultImgs: string[];
  compareRes: number[][];
  overAll: string;
}

export const getWorkCondiAction = createAsyncThunk(
  "workCondition",
  (par, { dispatch }) => {
    getWorkCondition().then((res) => {
      dispatch(changeWorkConditionAction(res));
    });
  }
);

/* 拿到默认工况数据 */
export const getWorkDefaultAction = createAsyncThunk(
  "defaultData",
  (par, { dispatch }) => {
    try {
      getWorkDefault().then((res) => {
        // console.log(res);
        dispatch(changeGuideNewCondiAction(res["0"]));
        dispatch(changeNavigateNewCondiAction(res["1"]));
        dispatch(changeRemoteNewCondiAction(res["2"]));
        dispatch(changeVoiceNewCondiAction(res["3"]));
      });
    } catch (err) {
      message.open({
        type: "error",
        content: "网络请求发生错误",
        duration: 2
      });
    }
  }
);

/* 生成对应工况的数据集 */
export const getWorkDataAction = createAsyncThunk<
  {
    status: number;
    info: string;
  },
  string,
  { state: IrootState }
>("genDataset", async (par, { dispatch, getState }) => {
  const scene = par;
  const sceneNum = sceneToNum[scene];
  const date_type = getState().basicConfig.dataSet;
  const checkList = getState().adaptAbili.checkList[sceneNum];
  const interference = getState().adaptAbili[scene] as Iwork[];
  const checkInterfer: Iwork[] = [];
  checkList.forEach((item: boolean, index: number) => {
    if (item) checkInterfer.push(interference[index]);
  });
  //   console.log("要被执行的工况", newInter);
  console.log("scene:", scene);

  try {
    console.log(`${scene}请求工况`, checkInterfer);
    const timeStart = performance.now();
    const res = await getWorkDataset(sceneNum, date_type, interference);
    const timeEnd = performance.now();
    const timeDur = ((timeEnd - timeStart) / 1000).toFixed(3);
    console.log(`${scene}场景对应数据集生成时间为：${timeDur}s`);
    dispatch(changeGenDataStatAction(res.status));

    return {
      status: res.status,
      info: res.info
    };
  } catch (err) {
    return {
      status: 1,
      info: `网络请求错误,${err}`
    };
  }
});

/*执行工况拿到结果*/
export const getWorkResultAction = createAsyncThunk<
  {
    status: number;
    info: string;
  },
  void,
  { state: IrootState }
>("workResult", async (par, { dispatch, getState }) => {
  const scene = getState().basicConfig.scene;
  const sceneNum: number = getState().basicConfig.sceneNum;
  const date_type = getState().basicConfig.dataSet;
  const checkList = getState().adaptAbili.checkList[sceneNum];
  const model_name = getState().basicConfig.currentModule;
  const newInter: Iwork[] = [];
  const realResult: string[] = [];
  const realScore: (number | undefined)[] = [];

  const interference = getState().adaptAbili[scene] as Iwork[];
  checkList.forEach((item: boolean, index: number) => {
    if (item) newInter.push(interference[index]);
  });
  console.log("要被执行的工况", newInter);
  if (newInter.length > 0) {
    try {
      const res: IworkResult = await getWorkResult(
        sceneNum,
        date_type,
        newInter
      );
      console.log("可适应能力返回的测试结果", res);
      dispatch(changeRunResult(res));
      const populationAll = (
        100 *
        (res.population_score.reduce((pre: number, cur: number) => cur + pre) /
          res.population_score.length)
      ).toFixed(2);
      dispatch(changeAdaptPopulationAction(populationAll));
      if (res.status == 0) {
        dispatch(changeAdaptOverAllAction(res.overall));
        let count = 0;
        checkList.forEach((item, index) => {
          if (item) {
            const curScore = res["population_score"][count];
            realResult.push(res.condition_result[count]);
            realScore.push(parseFloat((100 * curScore).toFixed(2)));
            count++;
          } else {
            realResult.push("");
            realScore.push(undefined);
          }
        });

        console.log("real_score", realScore);
        console.log("真正的测试结果", realResult);
        dispatch(getCompareResListAction());
        switch (scene) {
          case "guide": {
            dispatch(changeGuideResAction(realResult));
            dispatch(changeGuideScoreAction(realScore));
            break;
          }
          case "navigate": {
            dispatch(changeNaviResAction(realResult));
            dispatch(changeNavScoreAction(realScore));
            break;
          }
          case "remote": {
            dispatch(changeRemoResAction(realResult));
            dispatch(changeRemoteScore(realScore));
            break;
          }

          case "voice": {
            dispatch(changeVoiResAction(realResult));
            dispatch(changeVoiceScore(realScore));
            break;
          }

          default:
            break;
        }
        //请求图片
        // const imgRes = await getResultImgsAction(model_name,sceneNum,date_type,);
      }
      return {
        status: res.status,
        info: res.info
      };
    } catch (err) {
      return {
        status: 1,
        info: "网络请求错误"
      };
    }
  } else {
    return {
      status: 1,
      info: "请至少选择一个工况进行测试"
    };
  }
});

/* 请求发送图片 */
export const getImgAction = createAsyncThunk<
  {
    baseUrl: string[];
  },
  {
    workIndex: number;
    pageScene: string;
    sceneNum: number;
    picIndex?: number;
  },
  { state: IrootState }
>("getImage", async (par, { dispatch, getState }) => {
  //   const scene = getState().basicConfig.scene;
  const sceneNum: number = par.sceneNum;
  const date_type: number = getState().basicConfig.dataSet;
  const interference = getState().adaptAbili[par.pageScene] as Iwork[];
  const preImgUrlList: string[] = getState().adaptAbili.imgUrl;
  const nowWork = interference[par.workIndex];
  /* 用来存放5个url */
  let imgUrlList = [];
  const sendCondition = {};
  Object.values(nowWork).map((item, index) => {
    Object.defineProperty(sendCondition, Object.keys(nowWork)[index], {
      value: item.intensity,
      writable: true,
      //一定要把enumerable设为true,否则新添加的属性是打印不出来的（不可枚举）
      enumerable: true
    });
  });

  try {
    if (par.picIndex) {
      const res = await getViewPic(
        sceneNum,
        date_type,
        par.picIndex,
        sendCondition
      );

      imgUrlList = [...preImgUrlList];
      imgUrlList[par.picIndex] = res;
      //   console.log("发送一张图片的网络请求！");
    } else {
      for (let i = 0; i < 5; i++) {
        const res = await getViewPic(sceneNum, date_type, i, sendCondition);
        imgUrlList.push(res);
      }
    }
    dispatch(changeImgUrlAction(imgUrlList));

    return { baseUrl: imgUrlList };
  } catch (err) {
    return {
      baseUrl: [""]
    };
  }
});

export const getAdaptResImgsAction = createAsyncThunk<
  void,
  Iwork[],
  {
    state: IrootState;
  }
>("getAdaptResImgs", async (par, { dispatch, getState }) => {
  try {
    const sceneNum = getState().basicConfig.sceneNum;
    const date_type = getState().basicConfig.dataSet;
    const model_name = getState().basicConfig.currentModule;
    const res = await getAdaptResultImgs(model_name, sceneNum, date_type, par);
    // console.log("结果返回的图片", res);
    dispatch(changeAdaptResImgsAction(res.images));
  } catch (err) {
    message.open({
      type: "error",
      content: "网络请求发生错误",
      duration: 2
    });
  }
});

/* 拿到对比结果的列表 */
export const getCompareResListAction = createAsyncThunk<
  void,
  void,
  { state: IrootState }
>("compareResList", (par, { dispatch, getState }) => {
  try {
    getCompareResList("adaptablity").then((res) => {
      // console.log(res);
      console.log("拿到可适应能力对比结果", res);

      // dispatch(changeAdaptCompareResAction(res));
      if (res.status) {
        message.open({
          type: "error",
          content: "返回score_list错误",
          duration: 2
        });
      } else {
        const result: number[][] = res.result.map((items) => {
          return items.map((item) => {
            return parseFloat((item * 100).toFixed(0));
          });
        });
        const scene = getState().basicConfig.scene;

        const basicRes = getState().basicEffect[scene]?.score;
        if (basicRes) {
          result.push(basicRes);
        }
        console.log("处理好的caompare数据", result);

        dispatch(changeAdaptCompareResAction(result));
      }
    });
  } catch (err) {
    message.open({
      type: "error",
      content: "网络请求发生错误",
      duration: 2
    });
  }
});

function isPendingAction(
  action: AnyAction
): action is RejectedAction | FulfilledAction {
  return (
    action.type.endsWith("/fulfilled") || action.type.endsWith("/rejected")
  );
}

const initialState: Iadapt = {
  guide: [
    {
      illumination: {
        intensity: 5,

        weight: 1
      },
      deformation: {
        intensity: 3,

        weight: 1
      },
      noise: {
        intensity: 6,

        weight: 1
      }
    },
    {
      cloud: {
        intensity: 4,

        weight: 1
      },
      illumination: {
        intensity: 4,

        weight: 1
      },

      blur: {
        intensity: 6,
        weight: 1
      }
    }
  ],
  navigate: [
    {
      occlusion: {
        intensity: 0,
        weight: 0
      },
      illumination: {
        intensity: 0,
        weight: 0
      },
      deformation: {
        intensity: 0,

        weight: 0
      },
      noise: {
        intensity: 0,

        weight: 0
      }
    },
    {
      cloud: {
        intensity: 0,

        weight: 0
      },
      illumination: {
        intensity: 0,

        weight: 0
      },

      blur: {
        intensity: 0,

        weight: 0
      }
    }
  ],
  remote: [
    {
      occlusion: {
        intensity: 0,
        weight: 0
      },
      illumination: {
        intensity: 0,
        weight: 0
      },
      deformation: {
        intensity: 0,
        weight: 0
      },
      noise: {
        intensity: 0,
        weight: 0
      }
    },

    {
      cloud: {
        intensity: 0,
        weight: 0
      },
      illumination: {
        intensity: 0,

        weight: 0
      },

      blur: {
        intensity: 0,
        weight: 0
      }
    }
  ],
  voice: [
    {
      explosion: {
        intensity: 1,

        weight: 1
      },
      signalLoss: {
        intensity: 1,
        weight: 1
      }
    },

    {
      explosion: {
        intensity: 1,
        weight: 1
      },
      signalLoss: {
        intensity: 1,
        weight: 1
      }
    }
  ],
  workCondition: {
    0: [],
    1: [],
    2: [],
    3: []
  },
  conditionList: [],
  genIsPending: [false, false, false, false],
  testIsPending: [false, false, false, false],
  genData_status: -1,
  workResult: [],
  needGenData: false,
  guideResult: [],
  navigateResult: [],
  remoteResult: [],
  voiceResult: [],
  navigateScore: [],
  remoteScore: [],
  guideScore: [],
  voiceScore: [],
  checkList: [
    [true, true],
    [true, true],
    [true, true],
    [true, true]
  ],
  runResult: {
    condition_result: [],
    overall: "",
    status: -1,
    info: "",
    population_score: [],
    score_info: [
      {
        status: 0,
        info: "",
        f1_score: 0.56,
        f1_result: 0,
        map_score: 0.87,
        map_result: 0,
        mar_score: 0.66,
        mar_result: 0,
        population_score: 0.7,
        population_result: 0
      },
      {
        status: 0,
        info: "",
        f1_score: 0.45,
        f1_result: 0,
        map_score: 0.73,
        map_result: 0,
        mar_score: 0.89,
        mar_result: 0,
        population_score: 0.56,
        population_result: 0
      },
      {
        status: 0,
        info: "",
        f1_score: 0.67,
        f1_result: 0,
        map_score: 0.82,
        map_result: 0,
        mar_score: 0.56,
        mar_result: 0,
        population_score: 0.77,
        population_result: 0
      }
    ]
  },
  imgUrl: [],
  newWorkObj: {},
  picIndex: 0,
  pageScene: "remote",
  populstion_score: 0,
  resultImgs: [],
  compareRes: [
    [77, 56, 23, 68],
    [82, 80, 63, 76],
    [77, 44, 88, 69]
  ],
  overAll: ""
};
const adaptSlice = createSlice({
  name: "adaptSlice",
  initialState: initialState,
  reducers: {
    changeWorkConditionAction(state, { payload }) {
      state.workCondition = payload;
    },
    changeConditionList(state, { payload }) {
      state.conditionList = payload;
    },
    changeGuideNewCondiAction(state, { payload }) {
      state.guide = payload;
    },
    changeNavigateNewCondiAction(state, { payload }) {
      state.navigate = payload;
    },
    changeRemoteNewCondiAction(state, { payload }) {
      state.remote = payload;
    },
    changeVoiceNewCondiAction(state, { payload }) {
      state.voice = payload;
    },
    changeGenDataStatAction(state, { payload }) {
      state.genData_status = payload;
    },
    changeWorkResultAction(state, { payload }) {
      state.workResult = payload;
    },
    changeNeedGenDataAction(state, { payload }) {
      state.needGenData = payload;
    },
    changeRunResult(state, { payload }) {
      state.runResult = payload;
    },
    changeGuideResAction(state, { payload }) {
      state.guideResult = payload;
    },
    changeNaviResAction(state, { payload }) {
      state.navigateResult = payload;
    },
    changeRemoResAction(state, { payload }) {
      state.remoteResult = payload;
    },
    changeVoiResAction(state, { payload }) {
      state.voiceResult = payload;
    },
    changeCheckListAction(state, { payload }) {
      state.checkList = payload;
    },
    changeImgUrlAction(state, { payload }) {
      state.imgUrl = payload;
    },
    changeNewWorkObjAction(state, { payload }) {
      state.newWorkObj = payload;
    },
    changePicIndexAction(state, { payload }) {
      state.picIndex = payload;
    },
    changePageSceneAction(state, { payload }) {
      state.pageScene = payload;
    },
    changeNavScoreAction(state, { payload }) {
      state.navigateScore = payload;
    },
    changeGuideScoreAction(state, { payload }) {
      state.guideScore = payload;
    },
    changeRemoteScore(state, { payload }) {
      state.remoteScore = payload;
    },
    changeVoiceScore(state, { payload }) {
      state.voiceScore = payload;
    },
    changeAdaptPopulationAction(state, { payload }) {
      state.populstion_score = payload;
    },
    changeAdaptResImgsAction(state, { payload }) {
      state.resultImgs = payload;
    },
    changeAdaptCompareResAction(state, { payload }) {
      state.compareRes = payload;
    },
    changeAdaptOverAllAction(state, { payload }) {
      state.overAll = payload;
    }
  },
  extraReducers: (builder) => {
    // const updateIsPending = (state: Iadapt, prop: string, value: boolean) => {
    //   const sceneNum = sceneToNum[state.pageScene];

    //   const cur = state[prop] as boolean[];
    //   const myState = [...cur];
    //   myState[sceneNum] = value;
    //   state[prop] = myState;
    // };
    const updateIsPending = (state: Iadapt, value: boolean) => {
      const sceneNum = sceneToNum[state.pageScene];

      const cur = state.genIsPending;
      const myState = [...cur];
      myState[sceneNum] = value;
      state.genIsPending = myState;
    };
    const updateIsTesting = (state: Iadapt, value: boolean) => {
      const sceneNum = sceneToNum[state.pageScene];

      const cur = state.testIsPending;
      const myState = [...cur];
      myState[sceneNum] = value;
      state.testIsPending = myState;
    };
    builder
      .addCase(getWorkDataAction.pending, (state) => {
        updateIsPending(state, true);
      })
      .addCase(getWorkDataAction.fulfilled, (state) => {
        updateIsPending(state, false);
      })
      .addCase(getWorkDataAction.rejected, (state) => {
        updateIsPending(state, false);
      })
      .addCase(getWorkResultAction.pending, (state) => {
        updateIsTesting(state, true);
      })
      .addCase(getWorkResultAction.fulfilled, (state) => {
        updateIsTesting(state, false);
      })
      .addCase(getWorkResultAction.rejected, (state) => {
        updateIsTesting(state, false);
      });
  }
});

export default adaptSlice.reducer;

export const {
  changeWorkConditionAction,
  changeConditionList,
  changeGuideNewCondiAction,
  changeNavigateNewCondiAction,
  changeRemoteNewCondiAction,
  changeVoiceNewCondiAction,
  changeGenDataStatAction,
  changeWorkResultAction,
  changeNeedGenDataAction,
  changeGuideResAction,
  changeNaviResAction,
  changeRemoResAction,
  changeVoiResAction,
  changeCheckListAction,
  changeRunResult,
  changeImgUrlAction,
  changeNewWorkObjAction,
  changePicIndexAction,
  changePageSceneAction,
  changeGuideScoreAction,
  changeNavScoreAction,
  changeRemoteScore,
  changeVoiceScore,
  changeAdaptPopulationAction,
  changeAdaptResImgsAction,
  changeAdaptCompareResAction,
  changeAdaptOverAllAction
} = adaptSlice.actions;
