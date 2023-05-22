import lxrequest from "@/services/index";
import { Iguid, Inav, Iremo, Iresult, Ivoice } from "@/type";
import type { Isystem } from "../store/index";

export function getDocker(docker: FormData) {
  return lxrequest.request<string>({
    url: "/baseConfig/uploaddocker",
    method: "post",
    headers: { "Content-Type": "multipart/form-data" },
    data: docker
  });
}

export function getSystemOverview(docker_name: string) {
  return lxrequest.request<Isystem>({
    url: "/baseConfig/loadModel",
    headers: { "Content-Type": "application/json" },
    method: "post",
    data: {
      docker_name
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

export function getAlogrithmName() {
  return lxrequest.request({
    url: "/baseConfig/retModels",
    method: "get"
  });
}

export function getAfDelAlgoList(model_name: string) {
  return lxrequest.request({
    url: "/baseConfig/delete_model",
    method: "post",
    data: {
      model_name: model_name
    }
  });
}
