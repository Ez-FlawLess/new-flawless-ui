import { AxiosInstance } from "axios";
import { Dispatch, SetStateAction } from "react";

export interface NetworkI {
    [url: string]: boolean,
}

export interface NetworkPropsI {
    axiosInstance: AxiosInstance,
}

export type networkContextT = [NetworkI, Dispatch<SetStateAction<NetworkI>>]