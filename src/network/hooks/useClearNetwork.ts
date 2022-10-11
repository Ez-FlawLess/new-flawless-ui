import { useContext } from "react"
import { networkContext } from "../context/networkContext"

export const useClearNetwork = (): (url?: string, baseUrl?: string) => void => {

    const {setNetwork, setSecondaryNetworks} = useContext(networkContext)

    return (url?: string, baseUrl?: string) => {
        if (baseUrl && url) {
            setSecondaryNetworks(prev => ({
                ...prev,
                [baseUrl]: {
                    ...prev[baseUrl],
                    [url]: false,
                },
            }))
            return
        }
        if (url) {
            setNetwork(prev => ({
                ...prev,
                [url]: false,
            }))
            return
        }
        setNetwork({})
        setSecondaryNetworks({})
    }
}