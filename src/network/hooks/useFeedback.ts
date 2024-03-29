import { useMemo } from "react";
import { HttpFeedbackPropsI, UseFeedBackI } from "../types/HttpFeedback.types";
import { NetworkFeedbackI } from "../types/network.types";
import { StatusCodeMessagesI } from "../types/statusCode.types";
import createFeedback from "../util/createFeedback";

export const useFeedback = (
    network: NetworkFeedbackI | null | undefined,
    statusCodeMessages: StatusCodeMessagesI | undefined,
    props: Pick<HttpFeedbackPropsI<any>, 'onSuccess' | 'onError'>,
): UseFeedBackI | null => {
    const feedback = useMemo<UseFeedBackI | null>(() => {
        if (network && typeof network.success === 'boolean') {
            return createFeedback(network, statusCodeMessages, props)
        }
        return null
    }, [
        network,
        statusCodeMessages,
        props.onSuccess,
        props.onError,
    ])

    return feedback
}