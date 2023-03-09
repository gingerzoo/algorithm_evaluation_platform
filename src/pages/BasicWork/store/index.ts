import { commitData, runBasicEffect } from "@/pages/BasicConfig/service";
import { IrootState } from "@/store";
import { Iguid, Inav, Iremo, Ivoice } from "@/type";
import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { resolve } from "path";

interface Iprops {
  run_status: number;
  run_info: string;
  guideBe: Iguid;
  navigateBe: Inav;
  remoteBe: Iremo;
  voiceBe: Ivoice;
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
    center_position_error_score: -1,
    center_position_error_result: -1,
    iou_score: -1,
    iou_result: -1,
    robustness_score: -1,
    robustness_result: -1,
    population_score: -1,
    population_result: -1
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
  remoteBe: {
    status: -1,
    info: "",
    f1_score: -1,
    f1_result: -1,
    map_score: -1,
    map_result: -1,
    auc_score: -1,
    auc_result: -1,
    population_score: -1,
    population_result: -1
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
  run_status: -1,
  run_info: ""
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
    console.log("我是执行时的异步网络请求");

    dispatch(changeStatusBeAction(res.status));
    dispatch(changeInfoBeAction(res.info));
    switch (scene) {
      case 0:
        dispatch(changeGuideBeAction(res));
        break;
      case 1:
        dispatch(changeNavigateBeAction(res));
        break;
      case 2:
        dispatch(changeRemoBeAction(res));
        break;
      case 3:
        dispatch(changeVoiceBeAction(res));
        break;
      default:
        break;
    }

    return {
      status: res.status,
      info: res.info
    };
  } catch (err: any) {
    const error: AxiosError<ValidationErrors> = err;
    if (!error.response) {
      throw err;
    }
    // 我们遇到了合法性的错误，让我们把这些错误返回以便我们能在组件中引用它们并且设置表单错误
    return rejectWithValue(error.response.data);
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
    }
  }

  //   extraReducers: (builder) => {
  //     builder.addCase(getBasicEffectAction.fulfilled, (state, { payload }) => {
  //       if (payload) {
  //         state.run_status = payload.status;
  //         state.run_info = payload.info;
  //       }
  //     });
  //   }
});

export const {
  changeGuideBeAction,
  changeNavigateBeAction,
  changeRemoBeAction,
  changeVoiceBeAction,
  changeInfoBeAction,
  changeStatusBeAction
} = basicEffectSlice.actions;

export default basicEffectSlice.reducer;
