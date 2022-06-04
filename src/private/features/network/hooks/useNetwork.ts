import { AxiosInstance } from "axios";
import { useEffect, useState } from "react";
import { NetworkI, networkContextT } from "../types/network.types";
import { extractUrl } from "../util/extractUrl";

export const useNetwork = (axiosInstance: AxiosInstance): networkContextT => {

    const [network, setNetwork] = useState<NetworkI>({})

    useEffect(() => {

        const requestInterceptorId = axiosInstance.interceptors.request.use(
            config => {

                const url: string = extractUrl(config.url || '')

                setNetwork(prev => ({
                    ...prev,
                    [url]: true,
                }))

                return config
            },
            error => {
                throw error
            },
        )

        const responseInterceptorId = axiosInstance.interceptors.response.use(
            response => {

                const url: string = extractUrl(response.config.url || '')

                setNetwork(prev => ({
                    ...prev,
                    [url]: false,
                }))

                return response
            },
            error => {

                const url: string = extractUrl(error.config.url || '')

                setNetwork(prev => ({
                    ...prev,
                    [url]: false,
                }))

                throw error
            }
        )

        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptorId)
            axiosInstance.interceptors.response.eject(responseInterceptorId)
        }

    }, [axiosInstance])

    return [network, setNetwork]
}