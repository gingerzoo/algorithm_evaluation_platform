import lxrequset from "@/services/index";

export interface IsingleRes {
  scoreList: number[][];
  rateScore: number;
  class: number;
  overall: string;
}

export type IallRes = {
  [index: string]: IsingleRes | number;
  basic_effectiveness: IsingleRes;
  adaptablity: IsingleRes;
  dependability: IsingleRes;
  multiband: IsingleRes;
  abstract: IsingleRes;
  selflearn: IsingleRes;
  status: number;
};

export function getAllWorkResult() {
  return lxrequset.request<IallRes>({
    url: "/result/all_score_list",
    method: "get"
  });
}

// export function getAllWorkResult() {
//     return lxrequset.request<IallRes>({
//       url: "/result/all_score_list",
//       method: "get"
//     });
//   }
