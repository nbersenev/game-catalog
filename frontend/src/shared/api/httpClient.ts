import axios, { type AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "/api",
});

export const httpClient = {
  get: async <Response>(url: string, config?: AxiosRequestConfig) => {
    const { data } = await axiosInstance.get<Response>(url, config);
    return data;
  },
  post: async <Response, Payload = void>(
    url: string,
    payload?: Payload,
    config?: AxiosRequestConfig,
  ) => {
    const { data } = await axiosInstance.post<Response>(url, payload, config);
    return data;
  },
  patch: async <Response, Payload>(
    url: string,
    payload: Payload,
    config?: AxiosRequestConfig,
  ) => {
    const { data } = await axiosInstance.patch<Response>(url, payload, config);
    return data;
  },
  put: async <Response, Payload>(
    url: string,
    payload: Payload,
    config?: AxiosRequestConfig,
  ) => {
    const { data } = await axiosInstance.put<Response>(url, payload, config);
    return data;
  },
};
