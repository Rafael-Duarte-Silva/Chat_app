import { UserData } from "@/interfaces/UserData";
import api from "@/services/api";
import { AxiosPromise } from "axios";

export const getUserData = (
    endpoint: string,
    signal: AbortSignal,
): AxiosPromise<UserData[]> => {
    const response = api.get<UserData[]>(endpoint, { signal });
    return response;
};

