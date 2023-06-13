import { useMemo } from "react";
import { AlertsT } from "../../config/types/alert.types";
import { FeedbackI, HttpFeedbackPropsI } from "../types/HttpFeedback.types";
import { NetworkFeedbackI } from "../types/network.types";
import { StatusCodeGroupT, StatusCodeMessagesI } from "../types/statusCode.types";

export const useFeedback = (
    network: NetworkFeedbackI | null,
    statusCodeMessages: StatusCodeMessagesI | undefined,
    props: Pick<HttpFeedbackPropsI<any>, 'onSuccess' | 'onError'>,
): {
    status?: AlertsT,
    title?: string,
    message?: string,
    response?: any,
} => {
    const feedback = useMemo<{
        status?: AlertsT,
        title?: string,
        message?: string,
        response?: any,
    }>(() => {
        if (network && typeof network.success === 'boolean') {
            const response = network.response
            if (network.success) {
                if (props.onSuccess) {
                    const propsOnSuccessReturn = props.onSuccess(network.response)
                    if (propsOnSuccessReturn) return {
                        status: 'success',
                        response,
                        ...(
                            (propsOnSuccessReturn as FeedbackI).message || (propsOnSuccessReturn as FeedbackI).title
                            ? (propsOnSuccessReturn as FeedbackI)
                            : {
                                message: propsOnSuccessReturn as string,
                            }
                        ),
                    }
                }
                if (statusCodeMessages?.success) return {
                    status: 'success',
                    response,
                    ...statusCodeMessages.success,
                }
            } else if (!network.success) {
                if (props.onError) {
                    const propsOnErrorReturn = props.onError(network.response)
                    if (propsOnErrorReturn) return {
                        status: 'error',
                        response,
                        ...(
                            (propsOnErrorReturn as FeedbackI).message || (propsOnErrorReturn as FeedbackI).title
                            ? (propsOnErrorReturn as FeedbackI)
                            : {
                                message: propsOnErrorReturn as string,
                            }
                        ),
                    }
                }
                if (statusCodeMessages?.error) {
                    const statusCodeErrorReturn = statusCodeMessages.error.message(network.response)
                    if (statusCodeErrorReturn) return {
                        status: 'error',
                        response,
                        title: statusCodeMessages.error.title,
                        message: statusCodeErrorReturn,
                    }
                }
            }
            const statusCodeGroup: StatusCodeGroupT = parseInt(network.statusCode.toString()[0]) as StatusCodeGroupT
            if (statusCodeMessages) {
                const statusCodeMessage: any = statusCodeMessages[statusCodeGroup].message
                if (typeof statusCodeMessage === 'string') {
                    return {
                        status: network.success ? 'success' : 'error',
                        response,
                        title: statusCodeMessages[statusCodeGroup].title,
                        message: statusCodeMessage,
                    }
                } else {
                    return {
                        status: network.success ? 'success' : 'error',
                        response,
                        title: statusCodeMessages[statusCodeGroup].title,
                        message: statusCodeMessage[network.statusCode] as string,
                    }
                }
            }
        }
        return {}
    }, [
        network,
        statusCodeMessages,
        props.onSuccess,
        props.onError,
    ])

    return feedback
}