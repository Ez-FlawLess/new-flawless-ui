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