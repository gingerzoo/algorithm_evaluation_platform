import { runBasicEffect } from "@/pages/BasicConfig/service";
import { IrootState } from "@/store";
import { IbasicRes, Iguid, Inav, Iremo, Ivoice } from "@/type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { getResultPic } from "../service";

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
    | string[];
  run_status: number;
  run_info: string;
  //   guideBe: Iguid;
  //   navigateBe: Inav;
  //   remoteBe: Iremo;
  //   voiceBe: Ivoice;
  guide: IbasicRes;
  navigate: IbasicRes;
  remote: IbasicRes;
  voice: IbasicRes;
  isPending: boolean;
  resImgs: string[];
  population_score: number;
}

type Ipromise = {
  status: number;
  info: string;
};

interface ValidationErrors {
  errorMessage: string;
  field_errors: Record<string, string>;
}

const initialState: Iprops = {
  guide: {
    score: [],
    status: [1, 2, 1, 1]
  },

  navigate: {
    score: [],
    status: [1, 1, 1, 1]
  },

  remote: {
    score: [],
    status: [1, 2, 1, 1]
  },

  voice: {
    score: [],
    status: [1, 2, 1]
  },
  run_status: -1,
  run_info: "",
  isPending: false,
  resImgs: [],
  population_score: 0
};

export const getBasicEffectAction = createAsyncThunk<
  Ipromise,
  void,
  {
    state: IrootState;
    rejectValue: ValidationErrors;
  }
>("effectResult", async (par, { dispatch, getState }) => {
  const scene = getState().basicConfig.sceneNum;
  try {
    const res = await runBasicEffect();
    console.log("运行算法结束");

    dispatch(changeBasicStatusAction(res.status));
    dispatch(changeBasicInfoAction(res.info));
    dispatch(
      changeBasicPopulationAction(Number(res.population_score.toFixed(2)) * 100)
    );
    switch (scene) {
      case 0: {
        // dispatch(changeBaiscGuideAction(res));
        const {
          center_position_error_score,
          center_position_error_result,
          iou_score,
          iou_result,
          robustness_score,
          robustness_result,
          population_score,
          population_result
        } = res as Iguid;
        dispatch(
          changeBasicGuiReListAction({
            score: [
              center_position_error_score,
              iou_score,
              robustness_score,
              population_score
            ].map((item) => parseFloat((item * 100).toFixed(2))),
            status: [
              center_position_error_result,
              iou_result,
              robustness_result,
              population_result
            ]
          })
        );
        break;
      }
      case 1: {
        // dispatch(changeBasicNavigateAction(res));
        const {
          mutual_information_score,
          mutual_information_result,
          relevance_score,
          relevance_result,
          positioning_accuracy_score,
          positioning_accuracy_result,
          population_score,
          population_result
        } = res as Inav;

        dispatch(
          changeBasicNavReListAction({
            score: [
              mutual_information_score,
              relevance_score,

              positioning_accuracy_score,
              population_score
            ].map((item) => parseFloat((item * 100).toFixed(2))),
            status: [
              mutual_information_result,
              relevance_result,

              positioning_accuracy_result,
              population_result
            ]
          })
        );

        break;
      }
      case 2: {
        // dispatch(changeBasicRemoAction(res));
        const {
          f1_score,
          f1_result,
          map_score,
          map_result,
          mar_score,
          mar_result,
          population_score,
          population_result
        } = res as Iremo;
        dispatch(
          changeBasicRemoteReListAction({
            score: [f1_score, map_score, mar_score, population_score].map(
              (item) => parseFloat((item * 100).toFixed(2))
            ),
            status: [f1_result, map_result, mar_result, population_result]
          })
        );

        break;
      }
      case 3: {
        // dispatch(changeBasicVoiceAction(res));
        const {
          word_error_rate_score,
          word_error_rate_result,
          sentence_error_rate_score,
          sentence_error_rate_result,
          population_score,
          population_result
        } = res as Ivoice;
        dispatch(
          changeBasicVoiReListAction({
            score: [
              word_error_rate_score,
              sentence_error_rate_score,
              population_score
            ].map((item) => parseFloat((item * 100).toFixed(2))),
            status: [
              word_error_rate_result,
              sentence_error_rate_result,
              population_result
            ]
          })
        );

        break;
      }
      default:
        break;
    }

    return {
      status: res.status,
      info: res.info
    };
  } catch (err: any) {
    return {
      status: -1,
      info: `网络发生错误：${err}`
    };
  }
});

export const getResultImgsAction = createAsyncThunk<
  void,
  void,
  { state: IrootState }
>("getBasic_imgs", async (par, { dispatch, getState }) => {
  try {
    const model_name = getState().basicConfig.currentModule;
    const sceneNum = getState().basicConfig.sceneNum;
    const data_type = getState().basicConfig.dataSet;
    const res = await getResultPic(model_name, sceneNum, data_type);
    dispatch(changeBasicResImgsAction(res.images));
  } catch (err) {
    message.open({
      type: "error",
      content: "网络错误",
      duration: 2
    });
  }
});

const basicEffectSlice = createSlice({
  name: "basicEffectSlice",
  initialState,
  reducers: {
    changeBasicStatusAction(state, { payload }) {
      state.run_status = payload;
    },
    changeBasicInfoAction(state, { payload }) {
      state.run_info = payload;
    },
    changeBasicGuiReListAction(state, { payload }) {
      state.guide = payload;
    },
    changeBasicNavReListAction(state, { payload }) {
      state.navigate = payload;
    },
    changeBasicRemoteReListAction(state, { payload }) {
      state.remote = payload;
    },
    changeBasicVoiReListAction(state, { payload }) {
      state.voice = payload;
    },
    changeBasicResImgsAction(state, { payload }) {
      state.resImgs = payload;
    },
    changeBasicPopulationAction(state, { payload }) {
      state.population_score = payload;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getBasicEffectAction.pending, (state) => {
        state.isPending = true;
      })
      .addCase(getBasicEffectAction.fulfilled, (state) => {
        state.isPending = false;
      })
      .addCase(getBasicEffectAction.rejected, (state) => {
        state.isPending = false;
      });
  }
});

export const {
  changeBasicInfoAction,
  changeBasicNavReListAction,

  changeBasicRemoteReListAction,
  changeBasicResImgsAction,
  changeBasicVoiReListAction,

  changeBasicPopulationAction,
  changeBasicGuiReListAction,
  changeBasicStatusAction
} = basicEffectSlice.actions;

export default basicEffectSlice.reducer;
