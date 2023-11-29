import axios from "axios";
import lxrequest from "@/services/index";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IbasicRes, Iguid, Inav, Iremo, Ivoice } from "@/type";
import {
  changeRgbPath,
  changeInfraredPath,
  changeSarPath,
  changeDataSets,
  changeMultiGuideAction,
  changeMultiNavigateAction,
  changeMultiRemoAction,
  changeMultiVoiceAction,
  changeMultiStatusAction,
  changeMultiInfoAction,
  changeMultiPopulaAction,
  changeInfoRet
} from "../store";
import { IrootState } from "../../../store";
import { data_path } from "../store";

const api = axios.create({
  baseURL: "https://28047213-15a1-4160-89b5-a2ad2e5120a4.mock.pstmn.io"
});

type Ipromise = {
  status: number;
  info: string;
};

interface ValidationErrors {
  errorMessage: string;
  field_errors: Record<string, string>;
}

export const postMultiWaveAction = createAsyncThunk<
  Ipromise, //返回值类型
  void, //传递给这个异步 action 的参数的类型
  {
    state: IrootState;
    rejectValue: ValidationErrors;
  } //给{ dispatch, getState }赋值
>("multiwave", async (par, { dispatch, getState }) => {
  const state = getState();

  const sceneNum = state.basicConfig.sceneNum;
  const model = state.basicConfig.currentModule;

  const rgb: string = state.multiwave.rgb;
  const infrared: string = state.multiwave.infrared;
  const sar: string = state.multiwave.sar;
  const type_data = [rgb, infrared, sar];
  const path_data = state.multiwave.reality;
  const info_ret = state.multiwave.info_ret;

  try {
    const res = await runMultiWaveEffect(
      rgb,
      infrared,
      sar,
      type_data,
      path_data
    );
    console.log("运行算法结束");
    console.log("adapt_res", res);

    dispatch(changeMultiStatusAction(res.status));
    dispatch(changeMultiInfoAction(res.info));
    dispatch(
      changeMultiPopulaAction(
        parseFloat((res.population_score * 100).toFixed(1))
      )
    );
    dispatch(changeInfoRet(res.info_ret));

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
        } = res as Iguid;
        const score = [
          center_position_error_score,
          iou_score,
          robustness_score,
          population_score
        ].map((item) => parseFloat((item * 100).toFixed(1)));
        dispatch(
          changeMultiGuideAction({
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
        } = res as Inav;
        const score = [
          relevance_score,
          mutual_information_score,
          positioning_accuracy_score,
          population_score
        ].map((item) => parseFloat((item * 100).toFixed(1)));
        dispatch(
          changeMultiNavigateAction({
            score,
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
        const score = [f1_score, map_score, mar_score, population_score].map(
          (item) => parseFloat((item * 100).toFixed(1))
        );
        dispatch(
          changeMultiRemoAction({
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
        } = res as Ivoice;
        const score = [
          word_error_rate_score,
          sentence_error_rate_score,
          population_score
        ].map((item) => parseFloat((item * 100).toFixed(1)));
        dispatch(
          changeMultiVoiceAction({
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

export function runMultiWaveEffect(
  rgb: string,
  infrared: string,
  sar: string,
  type_data: string[],
  path_data: string
) {
  return lxrequest.request({
    url: "/multiband",
    method: "post",
    timeout: 10000000,
    data: {
      type_data,
      path_data
    }
  });
}
