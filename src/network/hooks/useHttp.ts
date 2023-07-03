import { AxiosResponse } from "axios"
import { useCallback, useContext, useId, useMemo } from "react"
import { Feedback } from "../components/Feedback"
import { networkContext } from "../context/networkContext"
import { statusCodesT } from "../types/statusCode.types"

export const useHttp = (options: {
    id?: number,
} = {}) => {

    const { network, setNetwork } = useContext(networkContext)

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

    return {
        loading,
        call,
        Feedback: Feedback(network[id], () => setNetwork(prev => ({
            ...prev,
            [id]: false,
        }))),
        id,
    }
}
