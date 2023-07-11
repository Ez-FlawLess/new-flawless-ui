import { FeedbackI, HttpFeedbackPropsI, UseFeedBackI } from "../types/HttpFeedback.types";
import { NetworkFeedbackI } from "../types/network.types";
import { StatusCodeGroupT, StatusCodeMessagesI } from "../types/statusCode.types";

const createFeedback = (network: NetworkFeedbackI, statusCodeMessages: StatusCodeMessagesI | undefined,props: Pick<HttpFeedbackPropsI<any>, 'onSuccess' | 'onError'>): UseFeedBackI | null => {
    const response = network.response
    let title: UseFeedBackI['title'];
    let message: UseFeedBackI['message'] = '';
    if (network.success) {
        if (props.onSuccess) {
            const propsOnSuccessReturn = props.onSuccess(network.response)
            if (propsOnSuccessReturn) {
                if ((propsOnSuccessReturn as FeedbackI).message) {
                    title = title || (propsOnSuccessReturn as FeedbackI).title
                    message = message || (propsOnSuccessReturn as FeedbackI).message
                } else {
                    message = message || propsOnSuccessReturn as string
                }
            }
        }
        if (statusCodeMessages?.success) {
            const statusCodeSuccessReturn = statusCodeMessages.success.message(network.response)
            if (statusCodeSuccessReturn) {
                title = title || statusCodeMessages.success.title
                message = message || statusCodeSuccessReturn
            }
        }
    } else {
        if (props.onError) {
            const propsOnErrorReturn = props.onError(network.response)
            if (propsOnErrorReturn) {
                if ((propsOnErrorReturn as FeedbackI).message) {
                    title = title || (propsOnErrorReturn as FeedbackI).title
                    message = message || (propsOnErrorReturn as FeedbackI).message
                } else {
                    message = message || propsOnErrorReturn as string
                }
            }
        }
        if (statusCodeMessages?.error) {
            const statusCodeErrorReturn = statusCodeMessages.error.message(network.response)
            if (statusCodeErrorReturn) {
                title = title || statusCodeMessages.error.title
                message = message || statusCodeErrorReturn
            }
        }
    }
    const statusCodeGroup: StatusCodeGroupT = parseInt(network.statusCode.toString()[0]) as StatusCodeGroupT
    if (statusCodeMessages) {
        const statusCodeMessage: any = statusCodeMessages[statusCodeGroup].message
        if (typeof statusCodeMessage === 'string') {
            title = title || statusCodeMessages[statusCodeGroup].title,
            message = message || statusCodeMessage
        } else {
            title = title || statusCodeMessages[statusCodeGroup].title,
            message = message || statusCodeMessage[network.statusCode] as string
        }
    }
    return {
        status: network.success ? 'success' : 'error',
        response,
        title,
        message,
    }
}

export default createFeedback