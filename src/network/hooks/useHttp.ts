import { AxiosResponse } from "axios"
import { useCallback, useContext, useMemo } from "react"
import { Feedback } from "../components/Feedback"
import { networkContext } from "../context/networkContext"
import { statusCodesT } from "../types/statusCode.types"

export const useHttp = (options: {
    id?: number,
} = {}) => {

    const { network, setNetwork, setLastHttpId } = useContext(networkContext)

    const id = useMemo(() => {

        if (options.id !== undefined) {
            return options.id
        }
        
        let id = 0

        setLastHttpId(p => {
            id = p + 1
            return id
        })

        return id
    }, [options.id])

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
