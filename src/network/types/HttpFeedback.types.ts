import { AlertsT } from "../../config/types/alert.types";
import { StatusCodeGroupT, statusCodesT } from "./statusCode.types";

export interface HttpFeedbackPropsI<T> {
    url: string | number,
    baseUrl?: string,
    hideSuccess?: boolean,
    hideError?: boolean,
    onError?: (data: any) => string | FeedbackI | void,
    onSuccess?: (data: any) => string | FeedbackI | void,
    alertProps?: T,
}

export interface FeedbackI {
    title?: string, 
    message: string,
}

export interface UseFeedBackI {
    status: AlertsT,
    title?: string,
    message: string,
    response?: any,
    statusCodeGroup: StatusCodeGroupT,
    statusCode: statusCodesT,
}

export interface GlobalFeedbacks extends UseFeedBackI {
    id: number,
}