import lxrequset from "@/services/index";
import { Iresult, Iwork, IworkResult } from "@/type";

interface Idefault {
  [index: string]: Iwork;
}

interface Icondition {
  [index: string]: string[];
  "0": string[];
  "1": string[];
  "2": string[];
  "3": string[];
}

// interface Iresult{

// }

type Ipic = {
  [index: string]: number;
};

type IRespic = {
  images: string[];
};
type IsingleScore = {
  class: number;
  rateScore: number;
  scoreList: number[][];
};
type IresList = {
  status: number;
  result: IsingleScore;
};

export function getWorkCondition() {
  return lxrequset.request<Icondition>({
    url: "/adaptability/retType"
  });
}

export function getWorkDefault() {
  return lxrequset.request<Idefault>({
    url: "/adaptability/retDefault"
  });
}

export function getWorkDataset(
  scene: number,
  data_type: number,
  interference: Iwork[]
) {
  return lxrequset.request<Iresult>({
    url: "/adaptability/generateData",
    method: "post",
    timeout: 9000000,
    data: {
      scene,
      data_type,
      interference
    }
  });
}

export function getWorkResult(
  scene: number,
  data_type: number,
  interference: Iwork[]
) {
  return lxrequset.request<IworkResult>({
    url: "/adaptability/retResult",
    method: "post",
    timeout: 900000,
    data: {
      scene,
      data_type,
      interference
    }
  });
}

export function getViewPic(
  scene: number,
  data_type: number,
  index_img: number,
  interference: Ipic
) {
  return lxrequset.request({
    url: "/adaptability/imgDemo",
    method: "post",
    data: {
      scene,
      data_type,
      index_img,
      interference
    }
  });
}

export function getAdaptResultImgs(
  model_name: string,
  scene: number,
  data_type: number,
  interference: Iwork[]
) {
  return lxrequset.request<IRespic>({
    url: "/retImg/adaptabilityResult",
    method: "post",
    data: {
      model_name,
      scene,
      data_type,
      interference
    }
  });
}

export function getCompareResList(taskname: string) {
  return lxrequset.request<IresList>({
    url: "/result/score_list",
    method: "post",
    data: {
      taskname
    }
  });
}
