import type { AxiosInstance,  AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import { message } from 'ant-design-vue';
import { AxiosLoading } from "./loading";

const axiosLoaing = new AxiosLoading();

// 创建axios实例
const service: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 10 * 1000, // 请求超时时间
    headers: { "Content-Type": "application/json;charset=UTF-8" }
});

// 设置请求拦截
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = sessionStorage.getItem('token');
        if(token){
            config.headers.Authorization = token;
        }
        axiosLoaing.addLoading();
        return config;
    },
    (error: any) => {
        axiosLoaing.closeLoading();
        return Promise.reject(error)
    }
);

// 设置响应拦截
service.interceptors.response.use(
    (response: AxiosResponse) => {
        const data = response.data;
        axiosLoaing.closeLoading();
        if (response.status === 200 || 201) {
            return data;
        } else {
            errorLog(response);
            return data;
        }
    },
    (err) => {
        axiosLoaing.closeLoading();
        errorLog(err.response);
        return err.response;
    }
);

// 统一错误处理
const errorLog = (err: any) => {
    // const { url, method, params, data, requestOptions } = err.config;
    message.error(`${err.data.statusCode} - ${err.data.message}`)

};


export default service;


