import { FC, ReactElement, useContext } from "react";
import { configContext } from "../../config/context/config.context";
import { AlertI } from "../../package";
import { useFeedback } from "../hooks/useFeedback";
import { HttpFeedbackPropsI } from "../types/HttpFeedback.types";
import { NetworkFeedbackI } from "../types/network.types";

export const Feedback: (
    networkFeedback: NetworkFeedbackI | null,
    onClose: () => void,
) => FC<Omit<HttpFeedbackPropsI<any>, 'url' | 'baseUrl'>> = (networkFeedback, onClose) => {
    
    const Test: FC<Omit<HttpFeedbackPropsI<any>, 'url' | 'baseUrl'>> = (props) => {

        if (networkFeedback === null) return null

        const { components, statusCodeMessages } = useContext(configContext)
        
        const feedback = useFeedback(networkFeedback, statusCodeMessages, {
            onSuccess: props.onSuccess,
            onError: props.onError,
        })
        
        if (
            feedback.message 
            && 
            components?.alerts 
            &&
            (
                (feedback.status === 'success' && props.showSuccess)
                ||
                (feedback.status === 'error' && props.showError)
            )
        ) return components.alerts[feedback.status]({
            title: feedback.title,
            message: feedback.message,
            onClose,
            props: props.alertProps,
        })
        return null
    }

    Test.defaultProps = {
        showSuccess: true,
        showError: true,
    }

    return Test
}