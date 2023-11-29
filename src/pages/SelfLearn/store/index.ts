import { IrootState } from "@/store";
import { IbasicRes, Iguid, Inav, Iremo, Ivoice } from "../type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { getResultPic } from "../service";
import { runSelfLearn } from "../service";

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
  slguide: IbasicRes;
  slnavigate: IbasicRes;
  slremote: IbasicRes;
  slvoice: IbasicRes;
  isPending: boolean;
  slresImgs: string[]; //修改
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
  slguide: {
    score: [],
    status: [1, 2, 1, 1, 1, 1, 1, 1]
  },

  slnavigate: {
    score: [],
    status: [1, 1, 1, 1, 1, 1, 1, 1]
  },

  slremote: {
    score: [],
    status: [1, 2, 1, 1, 1, 1, 1, 1]
  },

  slvoice: {
    score: [],
    status: [1, 1, 2, 2, 1, 1]
  },
  run_status: -1,
  run_info: "",
  isPending: false,
  slresImgs: [], //修改
  population_score: 0
};

export const getSelfLearnRunAction = createAsyncThunk<
  Ipromise,
  void,
  {
    state: IrootState;
    rejectValue: ValidationErrors;
  }
>("effectResult", async (par, { dispatch, getState }) => {
  const scene = getState().basicConfig.sceneNum;
  try {
    // const res = await selfLearnrunBasicEffect();
    const res = await runSelfLearn(scene);
    console.log(res);
    console.log("运行算法结束");

    dispatch(changeSelfLearnStatusAction(res.status));
    dispatch(changeSelfLearnInfoAction(res.info));
    dispatch(
      changeSelfLearnPopulationAction(
        Number(res.population_score.toFixed(2)) * 100
      )
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
          population_result,
          center_position_error_score_second,
          center_position_error_result_second,
          iou_score_second,
          iou_result_second,
          robustness_score_second,
          robustness_result_second,
          population_score_second,
          population_result_second
        } = res as Iguid;
        dispatch(
          changeSelfLearnGuiReListAction({
            score: [
              center_position_error_score,
              iou_score,
              robustness_score,
              population_score,
              center_position_error_score_second,
              iou_score_second,
              robustness_score_second,
              population_score_second
            ].map((item) => parseFloat((item * 100).toFixed(1))),
            status: [
              center_position_error_result,
              iou_result,
              robustness_result,
              population_result,
              center_position_error_result_second,
              iou_result_second,
              robustness_result_second,
              population_result_second
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
          population_result,
          mutual_information_score_second,
          mutual_information_result_second,
          relevance_score_second,
          relevance_result_second,
          positioning_accuracy_score_second,
          positioning_accuracy_result_second,
          population_score_second,
          population_result_second
        } = res as Inav;

        dispatch(
          changeSelfLearnNavReListAction({
            score: [
              relevance_score,
              mutual_information_score,
              positioning_accuracy_score,
              population_score,
              relevance_score_second,
              mutual_information_score_second,
              positioning_accuracy_score_second,
              population_score_second
            ].map((item) => parseFloat((item * 100).toFixed(1))),
            status: [
              relevance_result,
              mutual_information_result,
              positioning_accuracy_result,
              population_result,
              relevance_result_second,
              mutual_information_result_second,
              positioning_accuracy_result_second,
              population_result_second
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
          population_result,
          f1_score_second,
          f1_result_second,
          map_score_second,
          map_result_second,
          mar_score_second,
          mar_result_second,
          population_score_second,
          population_result_second
        } = res as Iremo;
        dispatch(
          changeSelfLearnRemoteReListAction({
            score: [
              f1_score,
              map_score,
              mar_score,
              population_score,
              f1_score_second,
              map_score_second,
              mar_score_second,
              population_score_second
            ].map((item) => parseFloat((item * 100).toFixed(1))),
            status: [
              f1_result,
              map_result,
              mar_result,
              population_result,
              f1_result_second,
              map_result_second,
              mar_result_second,
              population_result_second
            ]
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
          population_result,
          word_error_rate_score_second,
          word_error_rate_result_second,
          sentence_error_rate_score_second,
          sentence_error_rate_result_second,
          population_score_second,
          population_result_second
        } = res as Ivoice;
        dispatch(
          changeSelfLearnVoiReListAction({
            score: [
              word_error_rate_score,
              sentence_error_rate_score,
              population_score,
              word_error_rate_score_second,
              sentence_error_rate_score_second,
              population_score_second
            ].map((item) => parseFloat((item * 100).toFixed(1))),
            status: [
              word_error_rate_result,
              sentence_error_rate_result,
              population_result,
              word_error_rate_result_second,
              sentence_error_rate_result_second,
              population_result_second
            ]
          })
        );

        break;
      }
      default:
        break;
    }
    console.log();
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

export const getSelfLearnResImgsAction = createAsyncThunk<
  void,
  void,
  { state: IrootState }
>("getBasic_imgs", async (par, { dispatch, getState }) => {
  try {
    const model_name = getState().basicConfig.currentModule;
    const sceneNum = getState().basicConfig.sceneNum;
    const data_type = getState().basicConfig.dataSet;
    const res = await getResultPic(model_name, sceneNum, data_type);
    dispatch(changeSelfLearnResImgsAction(res.images));
  } catch (err) {
    message.open({
      type: "error",
      content: "网络错误",
      duration: 2
    });
  }
});

const selfLearnSlice = createSlice({
  name: "selfLearnSlice",
  initialState,
  reducers: {
    // changeBaiscGuideAction(state, { payload }) {
    //   state.guideBe = payload;
    // },
    // changeBasicNavigateAction(state, { payload }) {
    //   state.navigateBe = payload;
    // },
    // changeBasicRemoAction(state, { payload }) {
    //   state.remoteBe = payload;
    // },
    // changeBasicVoiceAction(state, { payload }) {
    //   state.voiceBe = payload;
    // },
    changeSelfLearnStatusAction(state, { payload }) {
      state.run_status = payload;
    },
    changeSelfLearnInfoAction(state, { payload }) {
      state.run_info = payload;
    },
    changeSelfLearnGuiReListAction(state, { payload }) {
      state.slguide = payload;
    },
    changeSelfLearnNavReListAction(state, { payload }) {
      state.slnavigate = payload;
    },
    changeSelfLearnRemoteReListAction(state, { payload }) {
      state.slremote = payload;
    },
    changeSelfLearnVoiReListAction(state, { payload }) {
      state.slvoice = payload;
    },
    changeSelfLearnResImgsAction(state, { payload }) {
      state.slresImgs = payload; //修改
    },
    changeSelfLearnPopulationAction(state, { payload }) {
      state.population_score = payload;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getSelfLearnRunAction.pending, (state) => {
        state.isPending = true;
      })
      .addCase(getSelfLearnRunAction.fulfilled, (state) => {
        state.isPending = false;
      })
      .addCase(getSelfLearnRunAction.rejected, (state) => {
        state.isPending = false;
      });
  }
});

export const {
  changeSelfLearnGuiReListAction,
  changeSelfLearnInfoAction,
  changeSelfLearnNavReListAction,
  changeSelfLearnPopulationAction,
  changeSelfLearnRemoteReListAction,
  changeSelfLearnResImgsAction,
  changeSelfLearnStatusAction,
  changeSelfLearnVoiReListAction
} = selfLearnSlice.actions;

export default selfLearnSlice.reducer;
