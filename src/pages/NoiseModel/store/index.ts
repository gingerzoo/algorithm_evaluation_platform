import { sceneToNum } from "@/assets/data/local_data";
import { IrootState } from "@/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NoiseArray } from "@/assets/data/local_data";
import { getWorkDataset, getWorkResult } from "@/pages/AdaptAbli/services";
import { Iguid, Inav, Iremo, Ivoice, Iwork, IworkResult } from "@/type";
import { getCompareResListAction } from "@/pages/AdaptAbli/store";

type INoiseModel = {
  current: number;
  bandwidth: number;
  exposureTime: number;
  photonCount: number;
  temperature: number;
  resistance: number;
  tbandwidth: number;
  mqUnit: number;
  gainK1: number;
  gainK2: number;
  isCheckedFlag: boolean;
  noiceGenIsPending: boolean;
  noiceTestIsPending: boolean;
  work_status: number;
  gen_status: number;
  workCondition: Iwork[];
  work_result: IworkResult;
  noice_compareRes: number[][];
  //   scoreList: number[];
  //   statusList: number[];
};

/* 噪声模型生成数据集 */
export const getVoiceWorkDataAction = createAsyncThunk<
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
  const {
    current,
    bandwidth,
    exposureTime,
    photonCount,
    temperature,
    resistance,
    tbandwidth,
    mqUnit,
    gainK1,
    gainK2
  } = getState().noiseModel;
  const noiseArr = [
    current,
    bandwidth,
    exposureTime,
    photonCount,
    temperature,
    resistance,
    tbandwidth,
    mqUnit,
    gainK1,
    gainK2
  ];

  const interference = noiseArr.map((item, index) => {
    return [NoiseArray[index], { intensity: item, weight: 0 }];
  });

  console.log("物理噪声模型发送的工况", Object.fromEntries(interference));

  try {
    const res = await getWorkDataset(sceneNum, date_type, [
      Object.fromEntries(interference)
    ]);

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
export const getVoiceWorkResAction = createAsyncThunk<
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
  const {
    current,
    bandwidth,
    exposureTime,
    photonCount,
    temperature,
    resistance,
    tbandwidth,
    mqUnit,
    gainK1,
    gainK2
  } = getState().noiseModel;
  const noiseArr = [
    current,
    bandwidth,
    exposureTime,
    photonCount,
    temperature,
    resistance,
    tbandwidth,
    mqUnit,
    gainK1,
    gainK2
  ];

  const interference = noiseArr.map((item, index) => {
    return [NoiseArray[index], { intensity: item, weight: 0 }];
  });

  try {
    console.log("运行噪声模型传递给后端的参数", {
      scene: sceneNum,
      data_type: date_type,
      interference: [Object.fromEntries(interference)]
    });
    const res: IworkResult = await getWorkResult(sceneNum, date_type, [
      Object.fromEntries(interference)
    ]);
    console.log("噪声模型返回的测试结果", res);
    dispatch(changeNoiceWorkStatusAction(res.status));
    dispatch(changeNoiceWorkResAction(res));

    // let scoreList = null;
    // let statusList = null;
    // switch (sceneNum) {
    //   case 0: {
    //     const {
    //       center_position_error_score,
    //       center_position_error_result,
    //       iou_score,
    //       iou_result,
    //       robustness_score,
    //       robustness_result,
    //       population_score,
    //       population_result
    //     } = res.score_info[0] as Iguid;
    //     scoreList = [
    //       center_position_error_score,
    //       iou_score,
    //       robustness_score,
    //       population_score
    //     ].map((item) => parseFloat((item * 100).toFixed(1)));
    //     statusList = [
    //       center_position_error_result,
    //       iou_result,
    //       robustness_result,
    //       population_result
    //     ];

    //     break;
    //   }
    //   case 1: {
    //     const {
    //       mutual_information_score,
    //       mutual_information_result,
    //       relevance_score,
    //       relevance_result,
    //       positioning_accuracy_score,
    //       positioning_accuracy_result,
    //       population_score,
    //       population_result
    //     } = res.score_info[0] as Inav;
    //     scoreList = [
    //       mutual_information_score,
    //       relevance_score,

    //       positioning_accuracy_score,
    //       population_score
    //     ].map((item) => parseFloat((item * 100).toFixed(1)));
    //     statusList = [
    //       mutual_information_result,
    //       relevance_result,

    //       positioning_accuracy_result,
    //       population_result
    //     ];

    //     break;
    //   }
    //   case 2: {
    //     const {
    //       f1_score,
    //       f1_result,
    //       map_score,
    //       map_result,
    //       mar_score,
    //       mar_result,
    //       population_score,
    //       population_result
    //     } = res.score_info[0] as Iremo;
    //     scoreList = [f1_score, map_score, mar_score, population_score].map(
    //       (item) => parseFloat((item * 100).toFixed(1))
    //     );
    //     statusList = [f1_result, map_result, mar_result, population_result];

    //     break;
    //   }
    //   case 3: {

    //     const {
    //       word_error_rate_score,
    //       word_error_rate_result,
    //       sentence_error_rate_score,
    //       sentence_error_rate_result,
    //       population_score,
    //       population_result
    //     } = res.score_info[0] as Ivoice;
    //     scoreList = [
    //       word_error_rate_score,
    //       sentence_error_rate_score,
    //       population_score
    //     ].map((item) => parseFloat((item * 100).toFixed(1)));
    //     statusList = [
    //       word_error_rate_result,
    //       sentence_error_rate_result,
    //       population_result
    //     ];

    //     break;
    //   }
    //   default:
    //     break;
    // }

    // dispatch(changeNoiceScoreListAction(scoreList));
    // dispatch(changeNoiceStatusListAction(statusList));
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
  current: 1,
  bandwidth: 1,
  exposureTime: 1,
  photonCount: 1,
  temperature: 1,
  resistance: 1,
  tbandwidth: 1,
  mqUnit: 1,
  gainK1: 1,
  gainK2: 1,
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
  noice_compareRes: []
  //   scoreList: [],
  //   statusList: []
};

const resultSlice = createSlice({
  name: "selectTaskSlick",
  initialState,
  reducers: {
    changeNoiceCurrentAction(state, { payload }) {
      state.current = payload;
    },
    changeNoiceBandwidthAction(state, { payload }) {
      state.bandwidth = payload;
    },
    changeNoiceExposureTimeAction(state, { payload }) {
      state.exposureTime = payload;
    },
    changeNoicePhotonCountAction(state, { payload }) {
      state.photonCount = payload;
    },
    changeNoiceTemperatureAction(state, { payload }) {
      state.temperature = payload;
    },
    changeNoiceResistanceAction(state, { payload }) {
      state.resistance = payload;
    },
    changeNoiceMinQuantizationUnitAction(state, { payload }) {
      state.mqUnit = payload;
    },
    changeNoiceGainK1Action(state, { payload }) {
      state.gainK1 = payload;
    },
    changeNoiceGainK2Action(state, { payload }) {
      state.gainK2 = payload;
    },
    changeNoiceTbandwidthAction(state, { payload }) {
      state.tbandwidth = payload;
    },
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
      .addCase(getVoiceWorkDataAction.pending, (state) => {
        state.noiceGenIsPending = true;
      })
      .addCase(getVoiceWorkDataAction.fulfilled, (state) => {
        state.noiceGenIsPending = false;
      })
      .addCase(getVoiceWorkDataAction.rejected, (state) => {
        state.noiceGenIsPending = false;
      })
      .addCase(getVoiceWorkResAction.pending, (state) => {
        state.noiceTestIsPending = true;
      })
      .addCase(getVoiceWorkResAction.fulfilled, (state) => {
        state.noiceTestIsPending = false;
      })
      .addCase(getVoiceWorkResAction.rejected, (state) => {
        state.noiceTestIsPending = false;
      });
  }
});

export const {
  changeNoiceBandwidthAction,
  changeNoiceCurrentAction,
  changeNoiceExposureTimeAction,
  changeNoiceGainK1Action,
  changeNoiceGainK2Action,
  changeNoiceIsCheckedFlagAction,
  changeNoiceMinQuantizationUnitAction,
  changeNoicePhotonCountAction,
  changeNoiceResistanceAction,
  changeNoiceTbandwidthAction,
  changeNoiceTemperatureAction,
  changeNoiceGenIsPendingAction,
  changeNoiceTestIsPendingAction,
  changeNoiceWorkStatusAction,
  changeNoiceWorkCondiAction,
  changeNoiceWorkResAction,
  changeNoiceGenStatusAction,
  changeNoiceCompareResAction
  //   changeNoiceScoreListAction,
  //   changeNoiceStatusListAction
} = resultSlice.actions;

export const changeNoiseArray = [
  changeNoiceCurrentAction,
  changeNoiceBandwidthAction,
  changeNoiceExposureTimeAction,
  changeNoicePhotonCountAction,
  changeNoiceTemperatureAction,
  changeNoiceResistanceAction,
  changeNoiceTbandwidthAction,
  changeNoiceMinQuantizationUnitAction,
  changeNoiceGainK1Action,
  changeNoiceGainK2Action
];

export default resultSlice.reducer;
