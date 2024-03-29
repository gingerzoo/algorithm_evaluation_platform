import axios, { AxiosInstance } from "axios";
import MyreqConfig from "./type";

class MyRequest {
  instance: AxiosInstance;

  constructor(baseConfig: MyreqConfig) {
    this.instance = axios.create(baseConfig);
    this.instance.interceptors.response.use(
      (res) => {
        return res.data;
      },
      (err) => {
        //这里抛出错误和返回Promise.reject到底有啥区别？？？？
        throw new Error(err);
        // return Promise.reject(err);
        // Promise.reject(err);
        //抛出异常后代码就不会向下执行了
      }
    );
  }

  request<T = any>(config: MyreqConfig<T>) {
    if (config.interceptors?.reqSuccessFn) {
      config = config.interceptors.reqSuccessFn(config);
    }
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.resSuccessFn) {
            res = config.interceptors.resSuccessFn(res);
          }
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  post<T = any>(url: string, data: any) {
    return this.instance.post<any, T>(url, data);
  }
}

export default MyRequest;

//简易写法！！！！！！

//   request<T = any>(config: AxiosRequestConfig) {
//     return this.instance.request<any, T>(config)
//   }
