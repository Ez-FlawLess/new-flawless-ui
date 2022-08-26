import { FC, ReactElement, useContext, useEffect, useMemo } from "react";
import { configContext } from "../../config/context/config.context";
import { AlertsT } from "../../config/types/alert.types";
import { networkContext } from "../context/networkContext";
import { FeedbackI, HttpFeedbackPropsI } from "../types/HttpFeedback.types";
import { NetworkFeedbackI } from "../types/network.types";
import { StatusCodeGroupT } from "../types/statusCode.types";

export const HttpFeedback = <T, >(props: HttpFeedbackPropsI<T>): ReactElement<any, any> | null => {

    const { components, statusCodeMessages, httpTimer } = useContext(configContext)
    const networkState = useContext(networkContext)

    const feedback = useMemo<{
        status?: AlertsT,
        title?: string,
        message?: string,
        response?: any,
    }>(() => {
        const getNetwork: () => NetworkFeedbackI | undefined = () => {
            if (props.baseUrl) {
                if (networkState.secondaryNetworks[props.baseUrl]) {
                    return networkState.secondaryNetworks[props.baseUrl][props.url] as NetworkFeedbackI
                }
                return undefined
            }
            return networkState.network[props.url] as NetworkFeedbackI
        }
        const network = getNetwork()
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
        networkState.network[props.url], 
        networkState.secondaryNetworks[props.baseUrl || ''],
        props.url,
        props.baseUrl,
        statusCodeMessages,
        props.onSuccess,
        props.onError,
    ])

    useEffect(() => {
        if (httpTimer && feedback.message) {
            const timeoutId = setTimeout(() => {
                handleOnClose()
            }, httpTimer)

            return () => {
                clearTimeout(timeoutId)
            }
        }
    }, [httpTimer, feedback.message])

    const handleOnClose = () => {
        if (props.baseUrl) networkState.setSecondaryNetworks(prev => ({
            ...prev,
            [props.baseUrl!]: {
                ...prev[props.baseUrl!],
                [props.url]: false,
            },
        }))
        else networkState.setNetwork(prev => ({
            ...prev,
            [props.url]: false,
        }))
    }

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
        props: props.alertProps,
    })
    return null
}

HttpFeedback.defaultProps = {
    showError: true,
    showSuccess: true,
}