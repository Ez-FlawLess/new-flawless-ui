import { networkContext } from "private/features/network/context/networkContext"
import { useContext, useEffect, useState } from "react"

export const useLoading = (url: string): boolean => {

    const [network, setNetwork] = useContext(networkContext)

    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (network[url]) setLoading(true)
        else setLoading(false)
    }, [network[url]])

    return loading
}