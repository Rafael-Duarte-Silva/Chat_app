import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

const api = (axios: AxiosInstance) => {
    return {
        get: function <T>(url: string, config: AxiosRequestConfig = {}) {
            return axios.get<T>(url, config);
        },
        post: function <T, S>(
            url: string,
            data?: S,
            config: AxiosRequestConfig = {},
        ) {
            return axios.post<T>(url, data, config);
        },
        delete: function <T>(url: string, config: AxiosRequestConfig = {}) {
            return axios.delete<T>(url, config);
        },
    };
};

export default api(axiosInstance);
