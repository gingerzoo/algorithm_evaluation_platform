import { runBasicEffect } from "@/pages/BasicConfig/service";
import { IrootState } from "@/store";
import { IbasicRes, Iguid, Inav, Iremo, Ivoice } from "@/type";
import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit";

interface Iprops {
  [index: string]:
    | number
    | string
    | Iguid
    | Inav
    | Iremo
    | Ivoice
    | boolean
    | IbasicRes;
  run_status: number;
  run_info: string;
  guideBe: Iguid;
  navigateBe: Inav;
  remoteBe: Iremo;
  voiceBe: Ivoice;
  guide: IbasicRes;
  navigate: IbasicRes;
  remote: IbasicRes;
  voice: IbasicRes;
  isPending: boolean;
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
  guideBe: {
    status: -1,
    info: "",
    center_position_error_score: 80.5,
    center_position_error_result: -1,
    iou_score: 50.6,
    iou_result: -1,
    robustness_score: 70,
    robustness_result: -1,
    population_score: 75.4,
    population_result: -1
  },
  guide: {
    score: [80.5, 50, 70.2, 75],
    status: [1, 2, 1, 1]
  },
  navigateBe: {
    status: -1,
    info: "",
    mutual_information_score: -1,
    mutual_information_result: -1,
    relevance_score: -1,
    relevance_result: -1,
    positioning_accuracy_score: -1,
    positioning_accuracy_result: -1,
    population_score: -1,
    population_result: -1
  },
  navigate: {
    score: [47, 57, 62, 40],
    status: [1, 1, 1, 1]
  },
  remoteBe: {
    status: -1,
    info: "",
    f1_score: -1,
    f1_result: -1,
    map_score: -1,
    map_result: -1,
    mar_score: -1,
    mar_result: -1,
    population_score: -1,
    population_result: -1
  },
  remote: {
    score: [0, 0, 0, 0],
    status: [1, 2, 1, 1]
  },
  voiceBe: {
    status: -1,
    info: "",
    word_error_rate_score: -1,
    word_error_rate_result: -1,
    sentence_error_rate_score: -1,
    sentence_error_rate_result: -1,
    population_score: -1,
    population_result: -1
  },
  voice: {
    score: [0, 0, 0, 0],
    status: [1, 2, 1, 1]
  },
  run_status: -1,
  run_info: "",
  isPending: false
};

export const getBasicEffectAction = createAsyncThunk<
  Ipromise,
  void,
  {
    state: IrootState;
    rejectValue: ValidationErrors;
  }
>("effectResult", async (par, { dispatch, getState, rejectWithValue }) => {
  const scene = getState().basicConfig.sceneNum;
  try {
    const res = await runBasicEffect();
    console.log("运行算法结束");

    dispatch(changeStatusBeAction(res.status));
    dispatch(changeInfoBeAction(res.info));
    switch (scene) {
      case 0: {
        dispatch(changeGuideBeAction(res));
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
          changeGuiReListAction({
            score: [
              center_position_error_score,
              iou_score,
              robustness_score,
              population_score
            ],
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
        dispatch(changeNavigateBeAction(res));
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
          changeNavReListAction({
            score: [
              relevance_score,
              mutual_information_score,
              positioning_accuracy_score,
              population_score
            ],
            status: [
              relevance_result,
              mutual_information_result,
              positioning_accuracy_result,
              population_result
            ]
          })
        );

        break;
      }
      case 2: {
        dispatch(changeRemoBeAction(res));
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
          changeRemoteReListAction({
            score: [f1_score, map_score, mar_score, population_score],
            status: [f1_result, map_result, mar_result, population_result]
          })
        );

        break;
      }
      case 3: {
        dispatch(changeVoiceBeAction(res));
        const {
          word_error_rate_score,
          word_error_rate_result,
          sentence_error_rate_score,
          sentence_error_rate_result,
          population_score,
          population_result
        } = res as Ivoice;
        dispatch(
          changeVoiReListAction({
            score: [
              word_error_rate_score,
              sentence_error_rate_score,
              population_score
            ],
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

    // 我们遇到了合法性的错误，让我们把这些错误返回以便我们能在组件中引用它们并且设置表单错误
    // const error: AxiosError<ValidationErrors> = err;
    // if (!error.response) {
    //   throw new Error("fff");
    // }
    // return rejectWithValue(error.response.data);
  }
});

const basicEffectSlice = createSlice({
  name: "basicEffectSlice",
  initialState,
  reducers: {
    changeGuideBeAction(state, { payload }) {
      state.guideBe = payload;
    },
    changeNavigateBeAction(state, { payload }) {
      state.navigateBe = payload;
    },
    changeRemoBeAction(state, { payload }) {
      state.remoteBe = payload;
    },
    changeVoiceBeAction(state, { payload }) {
      state.voiceBe = payload;
    },
    changeStatusBeAction(state, { payload }) {
      state.run_status = payload;
    },
    changeInfoBeAction(state, { payload }) {
      state.run_info = payload;
    },
    changeGuiReListAction(state, { payload }) {
      state.guide = payload;
    },
    changeNavReListAction(state, { payload }) {
      state.navigate = payload;
    },
    changeRemoteReListAction(state, { payload }) {
      state.remote = payload;
    },
    changeVoiReListAction(state, { payload }) {
      state.voice = payload;
    }
  },
  //   extraReducers: {
  //     [getBasicEffectAction.pending]: (state) => {
  //       state.isPending = true;
  //     },
  //     [getBasicEffectAction.fulfilled]: (state) => {
  //       state.isPending = false;
  //     }
  //   }

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
  changeGuideBeAction,
  changeNavigateBeAction,
  changeRemoBeAction,
  changeVoiceBeAction,
  changeInfoBeAction,
  changeStatusBeAction,
  changeGuiReListAction,
  changeNavReListAction,
  changeRemoteReListAction,
  changeVoiReListAction
} = basicEffectSlice.actions;

export default basicEffectSlice.reducer;
