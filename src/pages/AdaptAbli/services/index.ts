import lxrequset from "@/services/index";
import { Iwork } from "../store";

interface Idefault {
  [index: string]: Iwork;
}

export function getWorkCondition() {
  return lxrequset.request({
    url: "/adaptability/retType"
  });
}

export function getWorkDefault() {
  return lxrequset.request<Idefault>({
    url: "/adaptability/retDefault"
  });
}
