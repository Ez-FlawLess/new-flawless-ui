import { FC, useContext } from "react";
import { configContext } from "../../config/context/config.context";
import { HttpFeedbackPropsI } from "../types/HttpFeedback.types";
import { useFeedback } from "../hooks/useFeedback";
import { NetworkFeedbackI } from "../types/network.types";

export const Feedback = (
    network: NetworkFeedbackI | null | undefined, 
    onClose: () => void, 
    options: Pick<HttpFeedbackPropsI<any>, 'onSuccess' | 'onError' | 'hideError' | 'hideSuccess'>,
): FC<any> => {
    
    const Test: FC<any> = (props) => {

        const { components, statusCodeMessages } = useContext(configContext)

        const feedback = useFeedback(network, statusCodeMessages, {
            onSuccess: options.onSuccess,
            onError: options.onError,
        })
        
        if (
            feedback !== null 
            && 
            components?.alerts 
            &&
            (
                (feedback.status === 'success' && !options.hideSuccess)
                ||
                (feedback.status === 'error' && !options.hideError)
            )
        ) return components.alerts[feedback.status]({
            title: feedback.title,
            message: feedback.message,
            onClose,
            props,
            statusCode: feedback.statusCode,
            statusCodeGroup: feedback.statusCodeGroup,
        })
        return null
    }

    return Test
}