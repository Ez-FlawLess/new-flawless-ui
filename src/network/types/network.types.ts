import { AxiosInstance } from "axios";
import { Dispatch, SetStateAction } from "react";
import { statusCodesT } from "./statusCode.types";

export interface NetworkFeedbackI {
    success: boolean,
    statusCode: statusCodesT,
    response: any,
}

export interface NetworkI {
    [url: string]: boolean | NetworkFeedbackI,
}

export interface SecondaryNetworksI {
    [url: string]: NetworkI,
}

export interface NetworkPropsI {
    axiosInstance: AxiosInstance,
    secondaryAxiosInstances?: AxiosInstance[],
}

export interface networkContextI  {
    network: NetworkI, 
    setNetwork: Dispatch<SetStateAction<NetworkI>>,
    numberOfPendingRequests: number,
    secondaryNetworks: SecondaryNetworksI,
    setSecondaryNetworks: Dispatch<SetStateAction<SecondaryNetworksI>>,
}