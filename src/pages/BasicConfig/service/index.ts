import lxrequest from "@/services/index";
import { Iguid, Inav, Iremo, Iresult, Ivoice } from "@/type";
import type { Ialgo, Isystem } from "../store/index";

interface Ires {
  model_name: Ialgo[];
}

interface Icoor {
  bbox: number[];
  class_name: string;
}
export type IimgCoor = {
  status: number;
  info: string;
  img: string;
  coor: Icoor[];
  num_all: number;
};

export function getDocker(docker: FormData) {
  return lxrequest.request<string>({
    url: "/baseConfig/uploaddocker",
    method: "post",
    headers: { "Content-Type": "multipart/form-data" },
    data: docker
  });
}

export function getSystemOverview(docker_name: string, scene: number) {
  return lxrequest.request<Isystem>({
    url: "/baseConfig/loadModel",
    headers: { "Content-Type": "application/json" },
    method: "post",
    timeout: 900000,
    data: {
      docker_name,
      scene
    }
  });
}

export function commitData(run_cmd: string, scene: number, data_type: number) {
  return lxrequest.request<Iresult>({
    url: "/baseConfig/retConfig",
    method: "post",
    data: {
      run_cmd,
      scene,
      data_type
    }
  });
}

export function runBasicEffect() {
  return lxrequest.request<Iguid | Inav | Iremo | Ivoice>({
    url: "/baseConfig/runBasicEffectiveness",
    timeout: 90000000
  });
}

export function getAlogrithmName(scene: number) {
  return lxrequest.request<Ires>({
    url: "/baseConfig/retModels",
    method: "post",
    data: {
      scene
    }
  });
}

export function getAfDelAlgoList(docker_name: string) {
  return lxrequest.request({
    url: "/baseConfig/delete_model",
    method: "post",
    data: {
      docker_name: docker_name
    }
  });
}

export function getDataSetImg(
  scene: number,
  data_type: string,
  index_img: number
) {
  return lxrequest.request<IimgCoor>({
    url: "/dataset/modify_coor",
    method: "post",
    data: {
      scene,
      data_type,
      index_img
    }
  });
}

export function getChangeImgCoor(
  scene: number,
  data_type: string,
  index_img: number,
  coor: object
) {
  return lxrequest.request<Iresult>({
    url: "/dataset/save_coor",
    method: "post",
    data: {
      scene,
      data_type,
      index_img,
      coor
    }
  });
}
