import { AxiosInstance } from "axios";
import { Dispatch, SetStateAction } from "react";

export interface NetworkI {
    [url: string]: boolean,
}

export interface NetworkPropsI {
    axiosInstance: AxiosInstance,
}

export interface networkContextI  {
    network: NetworkI, 
    setNetwork: Dispatch<SetStateAction<NetworkI>>,
    numberOfPendingRequests: number,
}