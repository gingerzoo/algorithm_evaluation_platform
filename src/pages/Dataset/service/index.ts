import lxrequest from "@/services/index";

import { Ibuild_data, Idataset } from "../store";

export function getDatasetInfo() {
  return lxrequest.request<Idataset[]>({
    url: "dataset/basic_info"
  });
}

export function getUploadDataset(dataset: FormData) {
  //返回字段为string
  return lxrequest.request<string>({
    url: "dataset/uploaddataset",
    method: "post",
    headers: { "Content-Type": "multipart/form-data" },
    data: dataset
  });
}

export function getUploadDatasetInfo(
  data_name: string,
  data_type: number,
  scene: number,
  info: string
) {
  //返回字段为string
  return lxrequest.request<string>({
    url: "dataset/uploaddataset_info",
    method: "post",

    data: {
      data_name,
      data_type,
      scene,
      info
    }
  });
}
