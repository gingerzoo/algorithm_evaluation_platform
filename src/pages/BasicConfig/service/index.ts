import lxrequest from "@/services/index";
import { Iguid, Inav, Iremo, Ivoice } from "@/type";
import type { Isystem } from "../store/index";

interface Istatus {
  status: number;
  info: string;
}

export function getSystemOverview(docker_name: string) {
  // /baseConfig/loadDocker
  return lxrequest.post<Isystem>("/baseConfig/loadDocker", {
    docker_name
  });
}

export function commitData(run_cmd: string, scene: number, data_type: number) {
  // /baseConfig/retConfig
  return lxrequest.request<Istatus>({
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
    url: "/baseConfig/runBasicEffectiveness"
  });
}
