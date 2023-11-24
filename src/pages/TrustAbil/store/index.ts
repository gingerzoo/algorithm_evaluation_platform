import { IrootState } from "@/store";
import { IbasicRes, Iguid, Inav, Iremo, Ivoice } from "@/type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { runTrustEffect } from "../service";

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
  black: number[];
  white: number[];
  blackNames: string[];
  whiteNames: string[];
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
  blackNames: [],
  whiteNames: [],
  black: [47, 66, 30],
  white: [55, 40, 62],
  population_score: 0
};

export const getTrustEffectAction = createAsyncThunk<
  Ipromise,
  void,
  {
    state: IrootState;
    rejectValue: ValidationErrors;
  }
>("effectResult", async (par, { dispatch, getState }) => {
  const sceneNum: number = getState().basicConfig.sceneNum;
  const data_type: number = getState().basicConfig.dataSet;
  const model_name: string = getState().basicConfig.currentModule;
  const blackNames: string[] = getState().trustAbili.blackNames;
  const whiteNames: string[] = getState().trustAbili.whiteNames;

  console.log("发送的whiteNames", whiteNames);
  console.log("发送的blackNames", blackNames);

  try {
    const res = await runTrustEffect(model_name, sceneNum, data_type, {
      white: whiteNames,
      black: blackNames
    });
    console.log("运行算法结束");
    console.log("adapt_res", res);

    dispatch(changeTrustStatusAction(res.status));
    dispatch(changeTrustInfoAction(res.info));
    dispatch(
      changeTrustPopulaAction(
        parseFloat((res.population_score * 100).toFixed(1))
      )
    );

    switch (sceneNum) {
      case 0: {
        const {
          center_position_error_score,
          center_position_error_result,
          iou_score,
          iou_result,
          robustness_score,
          robustness_result,
          population_score,
          population_result
        } = res.score_info[0] as Iguid;
        const score = [
          center_position_error_score,
          iou_score,
          robustness_score,
          population_score
        ].map((item) => parseFloat((item * 100).toFixed(1)));
        dispatch(changeTrustWhiteAction(score));
        dispatch(
          changeTrustGuideAction({
            score,
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
        } = res.score_info[0] as Inav;
        const score = [
          mutual_information_score,
          relevance_score,

          positioning_accuracy_score,
          population_score
        ].map((item) => parseFloat((item * 100).toFixed(1)));
        dispatch(changeTrustWhiteAction(score));
        dispatch(
          changeTrustNavigateAction({
            score,
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
        } = res.score_info[0] as Iremo;
        const score = [f1_score, map_score, mar_score, population_score].map(
          (item) => parseFloat((item * 100).toFixed(1))
        );
        dispatch(changeTrustWhiteAction(score));
        dispatch(
          changeTrustRemoAction({
            score,
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
        } = res.score_info[0] as Ivoice;
        const score = [
          word_error_rate_score,
          sentence_error_rate_score,
          population_score
        ].map((item) => parseFloat((item * 100).toFixed(1)));
        dispatch(changeTrustWhiteAction(score));
        dispatch(
          changeTrustVoiceAction({
            score,
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

export const trustAbiliSlice = createSlice({
  name: "trustAbility_slice",
  initialState,
  reducers: {
    changeTrustGuideAction(state, { payload }) {
      state.guide = payload;
    },
    changeTrustNavigateAction(state, { payload }) {
      state.navigate = payload;
    },
    changeTrustRemoAction(state, { payload }) {
      state.remote = payload;
    },
    changeTrustVoiceAction(state, { payload }) {
      state.voice = payload;
    },
    changeTrustStatusAction(state, { payload }) {
      state.run_status = payload;
    },
    changeTrustInfoAction(state, { payload }) {
      state.run_info = payload;
    },
    changeTrustPopulaAction(state, { payload }) {
      state.population_score = payload;
    },
    changeTrustWhiteAction(state, { payload }) {
      state.white = payload;
    },
    changeTrustBlackAction(state, { payload }) {
      state.black = payload;
    },
    changeTrustWhiteNamesAction(state, { payload }) {
      state.whiteNames = payload;
    },
    changeTrustBlackNamesAction(state, { payload }) {
      state.blackNames = payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getTrustEffectAction.pending, (state) => {
        state.isPending = true;
      })
      .addCase(getTrustEffectAction.fulfilled, (state) => {
        state.isPending = false;
      })
      .addCase(getTrustEffectAction.rejected, (state) => {
        state.isPending = false;
      });
  }
});

export const {
  changeTrustGuideAction,
  changeTrustInfoAction,
  changeTrustNavigateAction,
  changeTrustRemoAction,

  changeTrustStatusAction,
  changeTrustVoiceAction,
  changeTrustBlackAction,
  changeTrustPopulaAction,
  changeTrustWhiteAction,
  changeTrustBlackNamesAction,
  changeTrustWhiteNamesAction
} = trustAbiliSlice.actions;

export default trustAbiliSlice.reducer;
