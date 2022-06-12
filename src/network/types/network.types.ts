import { AxiosInstance } from "axios";
import { Dispatch, SetStateAction } from "react";
import { statusCodesT } from "./statusCode.types";

export interface NetworkI {
    [url: string]: boolean | {
        success: boolean,
        statusCode: statusCodesT,
        response: any,
    },
}

export interface NetworkPropsI {
    axiosInstance: AxiosInstance,
}

export interface networkContextI  {
    network: NetworkI, 
    setNetwork: Dispatch<SetStateAction<NetworkI>>,
    numberOfPendingRequests: number,
}