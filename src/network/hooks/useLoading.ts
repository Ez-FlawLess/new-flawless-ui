import { useContext, useEffect, useState } from "react"
import { networkContext } from "../context/networkContext"

export const useLoading = (url?: string | number, baseURL?: string): boolean => {

    const {network, numberOfPendingRequests, secondaryNetworks} = useContext(networkContext)

    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (baseURL && url) {
            if (secondaryNetworks[baseURL] && (secondaryNetworks[baseURL][url] as boolean) === true) setLoading(true)
            else setLoading(false)
        }
    }, [url, baseURL, secondaryNetworks[baseURL || '']])

    useEffect(() => {
         if (!baseURL && url) {
            if ((network[url] as boolean) === true) setLoading(true)
            else setLoading(false)
        }
    }, [url, network[url || ' '], baseURL])

    useEffect(() => {
        if (!url) {
            if (numberOfPendingRequests) setLoading(true)
            else setLoading(false)
        }
    }, [url, numberOfPendingRequests])

    return loading
}