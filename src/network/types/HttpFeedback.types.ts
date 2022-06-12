export interface HttpFeedbackPropsI {
    url: string,
    showSuccess?: boolean,
    showError?: boolean,
    onError?: (data: any) => string | {title: string, message: string} | void,
    onSuccess?: (data: any) => string | {title: string, message: string} | void,
}