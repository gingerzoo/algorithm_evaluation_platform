import lxrequest from "@/services/index";
import { Iguid, Inav, Iremo, Iresult, Ivoice } from "../type";

export function getResultPic(
  model_name: string,
  scene: number,
  data_type: number
) {
  return lxrequest.request({
    url: "/retImg/basicResult",
    method: "post",
    data: {
      model_name,
      scene,
      data_type
    }
  });
}
export function selfLearnrunBasicEffect() {
  return lxrequest.request<Iguid | Inav | Iremo | Ivoice>({
    url: "/selflearn/runBasicEffectiveness",
    timeout: 90000000
  });
}

export function runSelfLearn(scene: number) {
  return lxrequest.request<Iguid | Inav | Iremo | Ivoice>({
    url: "/selflearn/runBasicEffectiveness",
    timeout: 90000000,
    data: {
      scene
    }
  });
}
