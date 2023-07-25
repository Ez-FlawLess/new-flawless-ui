import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { Dispatch, SetStateAction } from "react";
import { statusCodesT } from "./statusCode.types";
import { GlobalFeedbacks, HttpFeedbackPropsI, UseFeedBackI } from "./HttpFeedback.types";

export interface NetworkFeedbackI {
    success: boolean,
    statusCode: statusCodesT,
    response: any,
}

export interface NetworkI {
    [url: string | number]: boolean | NetworkFeedbackI,
}

export interface SecondaryNetworksI {
    [url: string]: NetworkI,
}

export interface NetworkPropsI {
    axiosInstance?: AxiosConfigT,
    secondaryAxiosInstances?: AxiosConfigT[],
}

export interface networkContextI  {
    network: NetworkI, 
    setNetwork: Dispatch<SetStateAction<NetworkI>>,
    numberOfPendingRequests: number,
    setNumberOfPendingRequests: Dispatch<SetStateAction<number>>,
    secondaryNetworks: SecondaryNetworksI,
    setSecondaryNetworks: Dispatch<SetStateAction<SecondaryNetworksI>>,
    globalFeedbacks: GlobalFeedbacks[],
    setGlobalFeedbacks: Dispatch<SetStateAction<GlobalFeedbacks[]>>,
    newGlobalFeedback: (id: number, network: NetworkFeedbackI,options: Omit<UseHttpOptionsI, 'id'>) => void,
}

export type AxiosConfigT = AxiosInstance | AxiosInstanceI

export interface AxiosInstanceI {
    instance: AxiosInstance,
    onConfig?: (config: AxiosRequestConfig<any>) => AxiosRequestConfig<any>, 
    onConfigError?: (error: any) => any,
    onResponse?: (response: AxiosResponse<any, any>) => AxiosResponse<any, any>,
    onResponseError?: (error: any) => any,
}

export interface UseHttpOptionsI extends Omit<HttpFeedbackPropsI<any>, 'url' | 'baseUrl' | 'alertProps'> {
    id?: number,
    keep?: boolean,
}