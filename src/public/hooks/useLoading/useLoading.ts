import { networkContext } from "private/features/network/context/networkContext"
import { useContext, useEffect, useState } from "react"

export const useLoading = (url?: string): boolean => {

    const {network, numberOfPendingRequests} = useContext(networkContext)

    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (url) {
            if (network[url]) setLoading(true)
            else setLoading(false)
        }
    }, [url, network[url || ' ']])

    useEffect(() => {
        if (!url) {
            if (numberOfPendingRequests) setLoading(true)
            else setLoading(false)
        }
    }, [url, numberOfPendingRequests])

    return loading
}