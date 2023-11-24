import {
  changeBasicGuiReListAction,
  changeBasicNavReListAction,
  changeBasicRemoteReListAction,
  changeBasicVoiReListAction
} from "@/pages/BasicWork/store";
import { useAppSelector } from "@/store";
import { useAppDispatch } from "@/store";
import { Iguid, Inav, Iremo, Ivoice } from "@/type";
export default function useResFormat(resData: any) {
  const { sceneNum } = useAppSelector((state) => ({
    sceneNum: state.basicConfig.sceneNum
  }));
  const dispatch = useAppDispatch();
  switch (sceneNum) {
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
      } = resData as Iguid;
      dispatch(
        changeBasicGuiReListAction({
          score: [
            center_position_error_score,
            iou_score,
            robustness_score,
            population_score
          ].map((item) => parseFloat((item * 100).toFixed(1))),
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
      } = resData as Inav;

      dispatch(
        changeBasicNavReListAction({
          score: [
            mutual_information_score,
            relevance_score,

            positioning_accuracy_score,
            population_score
          ].map((item) => parseFloat((item * 100).toFixed(1))),
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
      } = resData as Iremo;
      dispatch(
        changeBasicRemoteReListAction({
          score: [f1_score, map_score, mar_score, population_score].map(
            (item) => parseFloat((item * 100).toFixed(1))
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
      } = resData as Ivoice;
      dispatch(
        changeBasicVoiReListAction({
          score: [
            word_error_rate_score,
            sentence_error_rate_score,
            population_score
          ].map((item) => parseFloat((item * 100).toFixed(1))),
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
}
