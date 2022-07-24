export interface HttpFeedbackPropsI {
    url: string,
    baseUrl?: string,
    showSuccess?: boolean,
    showError?: boolean,
    onError?: (data: any) => string | FeedbackI | void,
    onSuccess?: (data: any) => string | FeedbackI | void,
}

export interface FeedbackI {
    title?: string, 
    message: string,
}