import { ReactElement, useCallback, useContext, useEffect, useMemo } from "react";
import { configContext } from "../../config/context/config.context";
import { networkContext } from "../context/networkContext";
import { useFeedback } from "../hooks/useFeedback";
import { HttpFeedbackPropsI } from "../types/HttpFeedback.types";
import { NetworkFeedbackI } from "../types/network.types";

export const HttpFeedback = <T, >(props: HttpFeedbackPropsI<T>): ReactElement<any, any> | null => {

    const { components, statusCodeMessages, httpTimer } = useContext(configContext)
    const networkState = useContext(networkContext)

    const network = useMemo<NetworkFeedbackI | null>(() => {
        if (props.baseUrl) {
            if (networkState.secondaryNetworks[props.baseUrl]) {
                return networkState.secondaryNetworks[props.baseUrl][props.url] as NetworkFeedbackI
            }
            return null
        }
        return networkState.network[props.url] as NetworkFeedbackI
    }, [
        networkState.network[props.url], 
        networkState.secondaryNetworks[props.baseUrl || ''],
        props.url,
        props.baseUrl,
    ])

    const feedback = useFeedback(network, statusCodeMessages, {
        onSuccess: props.onSuccess,
        onError: props.onError,
    })

    useEffect(() => {
        if (httpTimer && feedback !== null) {
            const timeoutId = setTimeout(() => {
                handleOnClose()
            }, httpTimer)

            return () => {
                clearTimeout(timeoutId)
            }
        }
    }, [httpTimer, feedback])

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
        feedback !== null
        && 
        components?.alerts 
        &&
        (
            (feedback.status === 'success' && !props.hideSuccess)
            ||
            (feedback.status === 'error' && !props.hideError) 
        )
    ) return components.alerts[feedback.status]({
        title: feedback.title,
        message: feedback.message,
        onClose: handleOnClose,
        props: props.alertProps,
        statusCode: feedback.statusCode,
        statusCodeGroup: feedback.statusCodeGroup,
    })
    return null
}