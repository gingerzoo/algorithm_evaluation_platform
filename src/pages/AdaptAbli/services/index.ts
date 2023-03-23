import lxrequset from "@/services/index";
import { Iresult } from "@/type";
import { Iwork } from "../store";

interface Idefault {
  [index: string]: Iwork;
}

type IworkResult = {
  condition_result: string[];
  overall: string;
  status: number;
  info: string;
};

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
  interference: Ipic
) {
  return lxrequset.request<Iresult>({
    url: "/adaptability/imgDemo",
    method: "post",
    data: {
      scene,
      data_type,
      interference
    }
  });
}
