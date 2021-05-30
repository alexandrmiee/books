import axios, { AxiosPromise, AxiosRequestConfig } from "axios";

export type RequestConfig = AxiosRequestConfig;
export type RequestPromise<T = any> = AxiosPromise<T>;
export type HttpErrorHandler = (error: {}) => void;
export enum HttpMethods {
  GET = "GET",
  POST = "POST",
}

export function request<T = any>(config: RequestConfig): RequestPromise<T> {
  return axios({ ...config });
}
