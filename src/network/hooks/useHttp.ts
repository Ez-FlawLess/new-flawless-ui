import { AxiosResponse } from "axios"
import { useCallback, useContext, useEffect, useId, useMemo } from "react"
import { Feedback } from "../components/Feedback"
import { networkContext } from "../context/networkContext"
import { statusCodesT } from "../types/statusCode.types"
import { HttpFeedbackPropsI, UseFeedBackI } from "../types/HttpFeedback.types"
import { configContext } from "../../config/context/config.context"
import { useFeedback } from "./useFeedback"
import { NetworkFeedbackI } from "../types/network.types"

export const useHttp = (options: {
    id?: number,
} & Omit<HttpFeedbackPropsI<any>, 'url' | 'baseUrl' | 'alertProps'> = {
    showSuccess: true,
    showError: true,
}) => {
 
    const { network, setNetwork, setGlobalFeedbacks } = useContext(networkContext)
    const { statusCodeMessages, globalHttpFeedback } = useContext(configContext)

    const reactId = useId()

    const id = useMemo<number>(() => {

        if (options.id !== undefined) {
            return options.id
        }
        
        return Number(reactId.slice(2, -1))
    }, [options.id, reactId])

    const loading = useMemo(() => {
        return network[id] === true
    }, [id, network[id]])

    // const networkFeedback = useMemo<NetworkFeedbackI | null>(() => {
    //     const n = network[id]
    //     if (n === undefined || typeof n === "boolean") return null
        
    //     return n as NetworkFeedbackI
    // }, [
    //     network[id],
    //     id,
    // ])

    const handleFeedbackSet = useCallback((feedback: UseFeedBackI) => {
        if (globalHttpFeedback) {
            setGlobalFeedbacks(p => [
                ...p.filter(f => f.id !== id),
                {
                    id,
                    ...feedback,
                },
            ])
        }
    }, [globalHttpFeedback, id])

    const feedback = useFeedback(network[id] as NetworkFeedbackI, statusCodeMessages, {
        onSuccess: options.onSuccess,
        onError: options.onError,
    }, handleFeedbackSet)

    const call = useCallback(async <T extends AxiosResponse>(c: Promise<T>) => {
        setNetwork(prev => ({
            ...prev,
            [id]: true,
        }))
        try {
            const response = await c

            setNetwork(prev => ({
                ...prev,
                [id]: {
                    success: true,
                    statusCode: response.status as statusCodesT,
                    response: response.data,
                },
            }))
            return response
        } catch (error: any) {
            setNetwork(prev => ({
                ...prev,
                [id]: {
                    success: false,
                    statusCode: error.response.status,
                    response: error.response.data,
                },
            }))
            throw new Error(error)
        }
    }, [id])

    const handleFeedbackClose = () => {
        setNetwork(prev => ({
            ...prev,
            [id]: false,
        }))
        if (globalHttpFeedback) {
            setGlobalFeedbacks(p => p.filter(f => f.id !== id))
        }
    }

    return {
        loading,
        call,
        Feedback: Feedback(feedback, handleFeedbackClose, options),
        id,
    }
}
