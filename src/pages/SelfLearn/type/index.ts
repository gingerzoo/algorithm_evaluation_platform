import { AsyncThunk } from "@reduxjs/toolkit";

export type IbasicRes = {
  score: number[];
  status: number[];
};
export interface Iguid {
  status: number;
  info: string;
  center_position_error_score: number;
  center_position_error_result: number;
  iou_score: number;
  iou_result: number;
  robustness_score: number;
  robustness_result: number;
  population_score: number;
  population_result: number;
  center_position_error_score_second: number;
  center_position_error_result_second: number;
  iou_score_second: number;
  iou_result_second: number;
  robustness_score_second: number;
  robustness_result_second: number;
  population_score_second: number;
  population_result_second: number;
}

export interface Inav {
  status: number;
  info: string;
  mutual_information_score: number;
  mutual_information_result: number;
  relevance_score: number;
  relevance_result: number;
  positioning_accuracy_score: number;
  positioning_accuracy_result: number;
  population_score: number;
  population_result: number;
  mutual_information_score_second: number;
  mutual_information_result_second: number;
  relevance_score_second: number;
  relevance_result_second: number;
  positioning_accuracy_score_second: number;
  positioning_accuracy_result_second: number;
  population_score_second: number;
  population_result_second: number;
}

export interface Iremo {
  status: number;
  info: string;
  f1_score: number;
  f1_result: number;
  map_score: number;
  map_result: number;
  mar_score: number;
  mar_result: number;
  population_score: number;
  population_result: number;
  f1_score_second: number;
  f1_result_second: number;
  map_score_second: number;
  map_result_second: number;
  mar_score_second: number;
  mar_result_second: number;
  population_score_second: number;
  population_result_second: number;
}

export interface Ivoice {
  status: number;
  info: string;
  word_error_rate_score: number;
  word_error_rate_result: number;
  sentence_error_rate_score: number;
  sentence_error_rate_result: number;
  population_score: number;
  population_result: number;
  word_error_rate_score_second: number;
  word_error_rate_result_second: number;
  sentence_error_rate_score_second: number;
  sentence_error_rate_result_second: number;
  population_score_second: number;
  population_result_second: number;
}

export interface Iconditon {
  // label: string;
  // condition: string;
  intensity: number;
  weight: number;
}

// export interface Iconditons {
//   tranEntoCh: Iwork;
//   tranChtoEn?: Iwork;
//   workCondition3?: Iwork;
// }

export interface Iresult {
  status: number;
  info: string;
}

export interface Iwork {
  [index: string]: {
    intensity: number;
    weight: number;
  };
}

export type IworkResult = {
  condition_result: string[];
  overall: string;
  status: number;
  info: string;
  population_score: number[];
  score_info: any[];
};

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

export type IruleData = {
  category: string;
  title: string;
  country: string;
  time: string;
  website: string;
  introduction: string;
  publisher: string;
  scenario: string;
};

export type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
export type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;
export type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;
