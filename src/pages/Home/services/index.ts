import { Ialgo } from "@/pages/BasicConfig/store";
import { IallRes } from "@/pages/Results/service";
import lxrequest from "@/services/index";

export type ThisModel = IallRes & Ialgo;
export function getDocument(name: string) {
  return lxrequest.request({
    url: `/guidance_info/${name}`,
    method: "get"
  });
}

export function getCanLogin(username: string, password: string) {
  return lxrequest.request({
    url: `/login`,
    method: "post",
    data: {
      username,
      password
    }
  });
}

export function getCanRegister(username: string, password: string) {
  return lxrequest.request({
    url: `/register`,
    method: "post",
    data: {
      username,
      password
    }
  });
}

export function getCanLogout() {
  return lxrequest.request({
    url: `/logout`,
    method: "get"
  });
}

// export function getTest() {
//   return lxrequest.request({
//     url: `/test_str`,
//     method: "get"
//   });
// }

export type IhistoryList = {
  status: number;
  allResult: string[];
};

export function getHistotyList() {
  return lxrequest.request<IhistoryList>({
    url: `/history/resutllist`,
    method: "get"
  });
}

export function getModelHistoryList(modelName: string) {
  return lxrequest.request<ThisModel>({
    url: `/history/modelresult`,
    method: "post",
    data: {
      modelName
    }
  });
}
