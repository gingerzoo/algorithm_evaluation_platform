import { sceneToNum } from "@/assets/data/local_data";
import { IrootState } from "@/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NoiseArray } from "@/assets/data/local_data";
import { getWorkDataset, getWorkResult } from "@/pages/AdaptAbli/services";
import { Iwork, IworkResult } from "@/type";

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
};

/* 噪声模型生成数据集 */
export const getVoiceWorkDataAction = createAsyncThunk<
  {
    status: number;
    info: string;
  },
  void,
  { state: IrootState }
>("genDataset", async (par, { dispatch, getState }) => {
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
>("workResult", async (par, { dispatch, getState }) => {
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
    const res: IworkResult = await getWorkResult(sceneNum, date_type, [
      Object.fromEntries(interference)
    ]);
    console.log("可适应能力返回的测试结果", res);
    dispatch(changeNoiceWorkStatusAction(res.status));
    dispatch(changeNoiceWorkResAction(res));
    // console.log("可适应能力返回的测试结果", res);
    //   dispatch(changeRunResult(res));
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
  current: 0,
  bandwidth: 0,
  exposureTime: 0,
  photonCount: 0,
  temperature: 0,
  resistance: 0,
  tbandwidth: 0,
  mqUnit: 0,
  gainK1: 0,
  gainK2: 0,
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
  }
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
    }
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
  changeNoiceGenStatusAction
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
