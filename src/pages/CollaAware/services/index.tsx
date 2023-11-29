import { ItableData } from "../store";
import lxrequest from "@/services/index";

export function findData() {
  return lxrequest.request<ItableData[]>({
    url: "/collaAware/find_data",
    method: "post"
  });
}
export function runpy1() {
  return lxrequest.request({
    url: "/collaAware/run-script-1",
    method: "post"
  });
}
export function runpy2() {
  return lxrequest.request({
    url: "/collaAware/run-script-2",
    method: "post"
  });
}
