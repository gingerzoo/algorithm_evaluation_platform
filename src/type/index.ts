import { Iwork } from "@/pages/AdaptAbli/store";

export type workingconditions =
  | "occlusion"
  | "illumination"
  | "noise"
  | "cloud"
  | "signalLoss"
  | "deformation"
  | "blur"
  | "explosion";

export type picConditionType =
  | "occlusion"
  | "illumination"
  | "deformation"
  | "nosie"
  | "cloud"
  | "blur";

export type voiConditionType = "explosion" | "signalLoss";

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
}

export interface Iconditon {
  // label: string;
  // condition: string;
  intensity: number;
  weight: number;
  note: string;
}

// export interface Iconditons {
//   tranEntoCh: Iwork;
//   tranChtoEn?: Iwork;
//   workCondition3?: Iwork;
// }
