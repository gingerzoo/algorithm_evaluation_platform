import lxrequest from "@/services/index";

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
