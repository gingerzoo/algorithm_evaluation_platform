import type { AxiosRequestConfig, AxiosResponse } from "axios";

export default interface MyreqConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  interceptors?: {
    reqSuccessFn: (config: AxiosRequestConfig) => AxiosRequestConfig;
    reqFaildeFn: (err: any) => any;
    resSuccessFn: (res: T) => T;
    resFailedFn: (err: any) => any;
  };
}
