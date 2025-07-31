import api from "@/services/api";
import { AxiosPromise } from "axios";

import { LoginData } from "../../interfaces/LoginData";

export const postUserLogin = (data: LoginData): AxiosPromise<void> => {
    const response = api.post<void, LoginData>("/auth/login", data);
    return response;
};

