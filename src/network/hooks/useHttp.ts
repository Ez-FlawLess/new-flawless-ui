import { AxiosResponse } from "axios"
import { useCallback, useContext, useId, useMemo } from "react"
import { Feedback } from "../components/Feedback"
import { networkContext } from "../context/networkContext"
import { statusCodesT } from "../types/statusCode.types"
import { configContext } from "../../config/context/config.context"
import { NetworkFeedbackI, UseHttpOptionsI } from "../types/network.types"

export const useHttp = (options: UseHttpOptionsI = {}) => {
 
    const { network, setNetwork, newGlobalFeedback, setNumberOfPendingRequests } = useContext(networkContext)
    const { globalHttpFeedback } = useContext(configContext)

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

    const call = useCallback(async <T extends AxiosResponse>(c: Promise<T>) => {
        setNetwork(prev => ({
            ...prev,
            [id]: true,
        }))
        setNumberOfPendingRequests(p => p + 1)
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
            setNumberOfPendingRequests(p => p - 1)
            if (globalHttpFeedback) {
                newGlobalFeedback(id, {
                    success: true,
                    statusCode: response.status as statusCodesT,
                    response: response.data,
                }, options)
            }
            return response
        } catch (error: any) {
            setNumberOfPendingRequests(p => p - 1)
            setNetwork(prev => ({
                ...prev,
                [id]: {
                    success: false,
                    statusCode: error.response.status,
                    response: error.response.data,
                },
            }))
            if (globalHttpFeedback) {
                newGlobalFeedback(id, {
                    success: false,
                    statusCode: error.response.status,
                    response: error.response.data,
                },options)
            }
            throw new Error(error)
        }
    }, [id])

    const handleFeedbackClose = () => {
        setNetwork(prev => ({
            ...prev,
            [id]: false,
        }))
    }

    return {
        loading,
        call,
        Feedback: Feedback(network[id] as NetworkFeedbackI, handleFeedbackClose, options),
        id,
    }
}
