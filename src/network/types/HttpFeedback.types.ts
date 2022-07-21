export interface HttpFeedbackPropsI {
    url: string,
    baseUrl?: string,
    showSuccess?: boolean,
    showError?: boolean,
    onError?: (data: any) => {title?: string, message: string} | void,
    onSuccess?: (data: any) => {title?: string, message: string} | void,
}