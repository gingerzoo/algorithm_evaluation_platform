import lxrequest from "@/services/index";
import { Iguid, Inav, Iremo, Iresult, Ivoice } from "@/type";
import type { Isystem } from "../store/index";

export function getDocker(docker: FormData) {
  // /baseConfig/loadDocker
  return lxrequest.request<Isystem>({
    url: "/baseConfig/loadDocker",
    method: "post",
    headers: { "Content-Type": "multipart/form-data" },
    data: docker
  });
}

export function getSystemOverview(docker: string) {
  // /baseConfig/loadDocker
  return lxrequest.request<Isystem>({
    url: "/baseConfig/loadDocker",
    method: "post",
    data: docker
  });
}

export function commitData(run_cmd: string, scene: number, data_type: number) {
  // /baseConfig/retConfig
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
