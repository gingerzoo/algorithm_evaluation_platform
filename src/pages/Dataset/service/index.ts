import lxrequest from "@/services/index";

import { Idataset } from "../store";

export function getDatasetInfo() {
  return lxrequest.request<Idataset[]>({
    url: "dataset/basic_info"
  });
}
