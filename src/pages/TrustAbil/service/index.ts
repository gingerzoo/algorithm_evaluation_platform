import lxrequest from "@/services/index";

type Iattack = {
  black: string[];
  white: string[];
};

export function runTrustEffect(
  model_name: string,
  scene: number,
  data_type: number,
  attacker_para: Iattack
) {
  return lxrequest.request({
    url: "/attacker/run_attacker",
    method: "post",
    data: {
      model_name,
      scene,
      data_type,
      attacker_para
    }
  });
}
