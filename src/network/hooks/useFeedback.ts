import { useMemo } from "react";
import { AlertsT } from "../../config/types/alert.types";
import { FeedbackI, HttpFeedbackPropsI, UseFeedBackI } from "../types/HttpFeedback.types";
import { NetworkFeedbackI } from "../types/network.types";
import { StatusCodeGroupT, StatusCodeMessagesI } from "../types/statusCode.types";

export const useFeedback = (
    network: NetworkFeedbackI | null,
    statusCodeMessages: StatusCodeMessagesI | undefined,
    props: Pick<HttpFeedbackPropsI<any>, 'onSuccess' | 'onError'>,
    onSet?: (feedback: UseFeedBackI) => void,
): UseFeedBackI | null => {
    const feedback = useMemo<UseFeedBackI | null>(() => {
        const returnFeedback = (feedback: UseFeedBackI): UseFeedBackI => {
            onSet?.(feedback)
            return feedback
        }
        if (network && typeof network.success === 'boolean') {
            const response = network.response
            if (network.success) {
                if (props.onSuccess) {
                    const propsOnSuccessReturn = props.onSuccess(network.response)
                    if (propsOnSuccessReturn) return returnFeedback({
                        status: 'success',
                        response,
                        ...(
                            (propsOnSuccessReturn as FeedbackI).message || (propsOnSuccessReturn as FeedbackI).title
                            ? (propsOnSuccessReturn as FeedbackI)
                            : {
                                message: propsOnSuccessReturn as string,
                            }
                        ),
                    })
                }
                if (statusCodeMessages?.success) return returnFeedback({
                    status: 'success',
                    response,
                    ...statusCodeMessages.success,
                })
            } else if (!network.success) {
                if (props.onError) {
                    const propsOnErrorReturn = props.onError(network.response)
                    if (propsOnErrorReturn) return returnFeedback({
                        status: 'error',
                        response,
                        ...(
                            (propsOnErrorReturn as FeedbackI).message || (propsOnErrorReturn as FeedbackI).title
                            ? (propsOnErrorReturn as FeedbackI)
                            : {
                                message: propsOnErrorReturn as string,
                            }
                        ),
                    })
                }
                if (statusCodeMessages?.error) {
                    const statusCodeErrorReturn = statusCodeMessages.error.message(network.response)
                    if (statusCodeErrorReturn) return returnFeedback({
                        status: 'error',
                        response,
                        title: statusCodeMessages.error.title,
                        message: statusCodeErrorReturn,
                    })
                }
            }
            const statusCodeGroup: StatusCodeGroupT = parseInt(network.statusCode.toString()[0]) as StatusCodeGroupT
            if (statusCodeMessages) {
                const statusCodeMessage: any = statusCodeMessages[statusCodeGroup].message
                if (typeof statusCodeMessage === 'string') {
                    return returnFeedback({
                        status: network.success ? 'success' : 'error',
                        response,
                        title: statusCodeMessages[statusCodeGroup].title,
                        message: statusCodeMessage,
                    })
                } else {
                    return returnFeedback({
                        status: network.success ? 'success' : 'error',
                        response,
                        title: statusCodeMessages[statusCodeGroup].title,
                        message: statusCodeMessage[network.statusCode] as string,
                    })
                }
            }
        }
        return null
    }, [
        network,
        statusCodeMessages,
        props.onSuccess,
        props.onError,
        onSet,
    ])

    return feedback
}