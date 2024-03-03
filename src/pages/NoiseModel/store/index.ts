import {
  noiceDefault1,
  noiceDefault2,
  noiceDefaultType,
  sceneToNum
} from "@/assets/data/local_data";
import { IrootState } from "@/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NoiseArray } from "@/assets/data/local_data";
import { getWorkDataset, getWorkResult } from "@/pages/AdaptAbli/services";
import { Iguid, Inav, Iremo, Ivoice, Iwork, IworkResult } from "@/type";
import { getCompareResListAction } from "@/pages/AdaptAbli/store";
import { scoreToRate } from "@/utils/classCalc";

type INoiseModel = {
  //   current: number;
  //   bandwidth: number;
  //   exposureTime: number;
  //   photonCount: number;
  //   temperature: number;
  //   resistance: number;
  //   tbandwidth: number;
  //   mqUnit: number;
  //   gainK1: number;
  //   gainK2: number;
  isCheckedFlag: boolean;
  noiceGenIsPending: boolean;
  noiceTestIsPending: boolean;
  work_status: number;
  gen_status: number;
  workCondition: Iwork[];
  work_result: IworkResult;
  noice_compareRes: number[][];
  work_Allcondition: Iwork[];
  isSelect: boolean[];
  noiseResList: number[];
  //   scoreList: number[];
  //   statusList: number[];
};

/* 噪声模型生成数据集 */
export const getNoiceWorkDataAction = createAsyncThunk<
  {
    status: number;
    info: string;
  },
  void,
  { state: IrootState }
>("noiceGenDataset", async (par, { dispatch, getState }) => {
  console.log("dispatch了getVoiceWorkDataAction！！！");
  const scene = getState().basicConfig.scene;
  const sceneNum: number = sceneToNum[scene];
  const date_type = getState().basicConfig.dataSet;
  const { work_Allcondition, isSelect } = getState().noiseModel;

  const curIndex = isSelect.findIndex((item) => item === true);
  const interference1 = work_Allcondition[curIndex];

  console.log("物理噪声模型生成的数据", interference1);

  try {
    const res = await getWorkDataset(sceneNum, date_type, [interference1]);

    dispatch(changeNoiceGenStatusAction(res.status));

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

/* 噪声模型执行测试 */
export const getNoiceWorkResAction = createAsyncThunk<
  {
    status: number;
    info: string;
  },
  void,
  { state: IrootState }
>("noiceWorkRun", async (par, { dispatch, getState }) => {
  //   const scene = getState().basicConfig.scene;
  const sceneNum: number = getState().basicConfig.sceneNum;
  const date_type = getState().basicConfig.dataSet;

  const { work_Allcondition, isSelect, noiseResList } = getState().noiseModel;

  const curIndex = isSelect.findIndex((item) => item === true);
  const interference1 = work_Allcondition[curIndex];
  try {
    console.log("运行噪声模型传递给后端的参数", {
      scene: sceneNum,
      data_type: date_type,
      interference: [interference1]
    });
    const res: IworkResult = await getWorkResult(sceneNum, date_type, [
      interference1
    ]);
    console.log("噪声模型返回的测试结果", res);
    const nowResList = new Array(noiseResList.length).fill(0);
    nowResList[curIndex] = scoreToRate(res.population_score[0] * 100);
    dispatch(changeNoiceWorkStatusAction(res.status));
    dispatch(changeNoiceWorkResAction(res));
    dispatch(changeNoiceResListAction(nowResList));
    dispatch(getCompareResListAction());
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
});

const initialState: INoiseModel = {
  //   current: 1,
  //   bandwidth: 1,
  //   exposureTime: 1,
  //   photonCount: 1,
  //   temperature: 1,
  //   resistance: 1,
  //   tbandwidth: 1,
  //   mqUnit: 1,
  //   gainK1: 1,
  //   gainK2: 1,
  isCheckedFlag: false,
  noiceGenIsPending: false,
  noiceTestIsPending: false,
  work_status: 1,
  workCondition: [],
  gen_status: 1,
  work_result: {
    condition_result: [],
    overall: "",
    status: -1,
    info: "",
    population_score: [],
    score_info: []
  },
  noice_compareRes: [],
  //   scoreList: [],
  //   statusList: [];
  isSelect: [true, false],
  work_Allcondition: [noiceDefault1, noiceDefault2],
  noiseResList: [0, 0]
};

const resultSlice = createSlice({
  name: "selectTaskSlick",
  initialState,
  reducers: {
    // changeNoiceCurrentAction(state, { payload }) {
    //   state.current = payload;
    // },
    // changeNoiceBandwidthAction(state, { payload }) {
    //   state.bandwidth = payload;
    // },
    // changeNoiceExposureTimeAction(state, { payload }) {
    //   state.exposureTime = payload;
    // },
    // changeNoicePhotonCountAction(state, { payload }) {
    //   state.photonCount = payload;
    // },
    // changeNoiceTemperatureAction(state, { payload }) {
    //   state.temperature = payload;
    // },
    // changeNoiceResistanceAction(state, { payload }) {
    //   state.resistance = payload;
    // },
    // changeNoiceMinQuantizationUnitAction(state, { payload }) {
    //   state.mqUnit = payload;
    // },
    // changeNoiceGainK1Action(state, { payload }) {
    //   state.gainK1 = payload;
    // },
    // changeNoiceGainK2Action(state, { payload }) {
    //   state.gainK2 = payload;
    // },
    // changeNoiceTbandwidthAction(state, { payload }) {
    //   state.tbandwidth = payload;
    // },
    changeNoiceIsCheckedFlagAction(state, { payload }) {
      state.isCheckedFlag = payload;
    },
    changeNoiceGenIsPendingAction(state, { payload }) {
      state.noiceGenIsPending = payload;
    },
    changeNoiceTestIsPendingAction(state, { payload }) {
      state.noiceTestIsPending = payload;
    },
    changeNoiceWorkStatusAction(state, { payload }) {
      state.work_status = payload;
    },
    changeNoiceWorkCondiAction(state, { payload }) {
      state.workCondition = payload;
    },
    changeNoiceWorkResAction(state, { payload }) {
      state.work_result = payload;
    },
    changeNoiceGenStatusAction(state, { payload }) {
      state.gen_status = payload;
    },
    changeNoiceCompareResAction(state, { payload }) {
      state.noice_compareRes = payload;
    },
    changeNoiceCheckListAction(state, { payload }) {
      state.isSelect = payload;
    },
    changeNoiceAllWorkCondition(state, { payload }) {
      state.work_Allcondition = payload;
    },
    changeNoiceResListAction(state, { payload }) {
      state.noiseResList = payload;
    }
    // changeNoiceScoreListAction(state, { payload }) {
    //   state.scoreList = payload;
    // },
    // changeNoiceStatusListAction(state, { payload }) {
    //   state.statusList = payload;
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNoiceWorkDataAction.pending, (state) => {
        state.noiceGenIsPending = true;
      })
      .addCase(getNoiceWorkDataAction.fulfilled, (state) => {
        state.noiceGenIsPending = false;
      })
      .addCase(getNoiceWorkDataAction.rejected, (state) => {
        state.noiceGenIsPending = false;
      })
      .addCase(getNoiceWorkResAction.pending, (state) => {
        state.noiceTestIsPending = true;
      })
      .addCase(getNoiceWorkResAction.fulfilled, (state) => {
        state.noiceTestIsPending = false;
      })
      .addCase(getNoiceWorkResAction.rejected, (state) => {
        state.noiceTestIsPending = false;
      });
  }
});

export const {
  //   changeNoiceBandwidthAction,
  //   changeNoiceCurrentAction,
  //   changeNoiceExposureTimeAction,
  //   changeNoiceGainK1Action,
  //   changeNoiceGainK2Action,
  changeNoiceIsCheckedFlagAction,
  //   changeNoiceMinQuantizationUnitAction,
  //   changeNoicePhotonCountAction,
  //   changeNoiceResistanceAction,
  //   changeNoiceTbandwidthAction,
  //   changeNoiceTemperatureAction,
  changeNoiceGenIsPendingAction,
  changeNoiceTestIsPendingAction,
  changeNoiceWorkStatusAction,
  changeNoiceWorkCondiAction,
  changeNoiceWorkResAction,
  changeNoiceGenStatusAction,
  changeNoiceCompareResAction,
  changeNoiceCheckListAction,
  changeNoiceAllWorkCondition,
  changeNoiceResListAction
  //   changeNoiceScoreListAction,
  //   changeNoiceStatusListAction
} = resultSlice.actions;

// export const changeNoiseArray = [
//   changeNoiceCurrentAction,
//   changeNoiceBandwidthAction,
//   changeNoiceExposureTimeAction,
//   changeNoicePhotonCountAction,
//   changeNoiceTemperatureAction,
//   changeNoiceResistanceAction,
//   changeNoiceTbandwidthAction,
//   changeNoiceMinQuantizationUnitAction,
//   changeNoiceGainK1Action,
//   changeNoiceGainK2Action
// ];

export default resultSlice.reducer;
