import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// 定义请求参数和响应类型
interface RequestParams<T> extends AxiosRequestConfig {
  data?: T;
  params?: T;
}

interface ResponseData<T = any> {
  code: number;
  message: string;
  data: T;
}

// 创建 axios 实例
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在请求发送之前做些什么
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做些什么
    return response.data;
  },
  (error) => {
    // 对响应错误做些什么
    return Promise.reject(error);
  }
);

// 封装请求方法
export function request<T>(config: RequestParams<T>): Promise<ResponseData<T>> {
  return instance(config) as Promise<ResponseData<T>>;
}