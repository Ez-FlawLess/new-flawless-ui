import { FC, useContext, useMemo } from "react";
import { configContext } from "../../config/context/config.context";
import { AlertsT } from "../../config/types/alert.types";
import { networkContext } from "../context/networkContext";
import { HttpFeedbackPropsI } from "../types/HttpFeedback.types";
import { NetworkFeedbackI } from "../types/network.types";
import { StatusCodeGroupT } from "../types/statusCode.types";

export const HttpFeedback: FC<HttpFeedbackPropsI> = props => {

    const { components, statusCodeMessages } = useContext(configContext)
    const networkState = useContext(networkContext)

    const feedback = useMemo<{
        status?: AlertsT,
        title?: string,
        message?: string,
    }>(() => {
        const network = networkState.network[props.url] as NetworkFeedbackI
        if (typeof network.success === 'boolean') {
            if (network.success) {
                if (props.onSuccess) {
                    const propsOnSuccessReturn = props.onSuccess(network.response)
                    if (propsOnSuccessReturn) return {
                        status: 'success',
                        ...propsOnSuccessReturn,
                    }
                }
                if (statusCodeMessages?.success) return {
                    status: 'success',
                    ...statusCodeMessages.success,
                }
            } else if (!network.success) {
                if (props.onError) {
                    const propsOnErrorReturn = props.onError(network.response)
                    if (propsOnErrorReturn) return {
                        status: 'error',
                        ...propsOnErrorReturn,
                    }
                }
                if (statusCodeMessages?.error) {
                    const statusCodeErrorReturn = statusCodeMessages.error.message(network.response)
                    if (statusCodeErrorReturn) return {
                        status: 'error',
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
                        title: statusCodeMessages[statusCodeGroup].title,
                        message: statusCodeMessage,
                    }
                } else {
                    
                    return {
                        status: network.success ? 'success' : 'error',
                        title: statusCodeMessages[statusCodeGroup].title,
                        message: statusCodeMessage[network.statusCode].message as string,
                    }
                }
            }
        }
        return {}
    }, [
        networkState.network[props.url], 
        statusCodeMessages,
        props.onSuccess, 
        props.onError,
    ])

    const handleOnClose = () => networkState.setNetwork(prev => ({
        ...prev,
        [props.url]: false,
    }))

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
        onClose: handleOnClose,
    })
    return null
}

HttpFeedback.defaultProps = {
    showError: true,
    showSuccess: true,
}