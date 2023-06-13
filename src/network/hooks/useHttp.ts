import { AxiosResponse } from "axios"
import { useCallback, useState } from "react"
import { Feedback } from "../components/Feedback"
import { NetworkFeedbackI } from "../types/network.types"
import { statusCodesT } from "../types/statusCode.types"

export const useHttp = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const [networkFeedback, setNetworkFeedback] = useState<NetworkFeedbackI | null>(null)

    const call = useCallback(async <T extends AxiosResponse>(c: Promise<T>) => {
        setLoading(true)
        try {
            const response = await c

            setLoading(false)
            setNetworkFeedback({
                success: true,
                statusCode: response.status as statusCodesT,
                response: response.data,
            })
            return response
        } catch (error: any) {
            setLoading(false)
            setNetworkFeedback({
                success: false,
                statusCode: error.response.status,
                response: error.response.data,
            })
            throw new Error(error)
        }
    }, [])

    return {
        loading,
        call,
        Feedback: Feedback(networkFeedback, () => setNetworkFeedback(null)),
    }
}
