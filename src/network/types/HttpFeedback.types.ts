import { AlertsT } from "../../config/types/alert.types";

export interface HttpFeedbackPropsI<T> {
    url: string | number,
    baseUrl?: string,
    showSuccess?: boolean,
    showError?: boolean,
    onError?: (data: any) => string | FeedbackI | void,
    onSuccess?: (data: any) => string | FeedbackI | void,
    alertProps?: T,
}

export interface FeedbackI {
    title?: string, 
    message: string,
}

export interface UseFeedBackI {
    status?: AlertsT,
    title?: string,
    message: string,
    response?: any,
}

export interface GlobalFeedbacks extends UseFeedBackI {
    id: number,
}