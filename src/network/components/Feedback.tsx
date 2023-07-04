import { FC, useContext } from "react";
import { configContext } from "../../config/context/config.context";
import { HttpFeedbackPropsI, UseFeedBackI } from "../types/HttpFeedback.types";

export const Feedback: (
    feedback: UseFeedBackI | null,
    onClose: () => void,
    options: Pick<HttpFeedbackPropsI<any>, 'onSuccess' | 'onError' | 'showSuccess' | 'showError'>,
) => FC<any> = (feedback, onClose, options) => {
    
    const Test: FC<any> = (props) => {

        const { components } = useContext(configContext)
        
        if (
            feedback !== null 
            && 
            components?.alerts 
            &&
            (
                (feedback.status === 'success' && options.showSuccess)
                ||
                (feedback.status === 'error' && options.showError)
            )
        ) return components.alerts[feedback.status]({
            title: feedback.title,
            message: feedback.message,
            onClose,
            props,
        })
        return null
    }

    return Test
}