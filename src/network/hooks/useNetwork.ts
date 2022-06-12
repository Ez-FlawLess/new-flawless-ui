import { AxiosInstance } from "axios";
import { useContext, useEffect, useState } from "react";
import { configContext } from "../../config/context/config.context";
import { HttpMethodT } from "../types/httpMethod.types";
import { NetworkI, networkContextI } from "../types/network.types";
import { statusCodesT } from "../types/statusCode.types";
import { extractUrl } from "../util/extractUrl";

export const useNetwork = (axiosInstance: AxiosInstance): networkContextI => {

    const config = useContext(configContext)

    const [network, setNetwork] = useState<NetworkI>({})
    const [numberOfPendingRequests, setNumberOfPendingRequests] = useState<number>(0)

    useEffect(() => {

        const requestInterceptorId = axiosInstance.interceptors.request.use(
            config => {

                const url: string = extractUrl(config.url || '')

                setNetwork(prev => ({
                    ...prev,
                    [url]: true,
                }))

                setNumberOfPendingRequests(prev => prev + 1)

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
                    [url]:  config.httpMethods?.includes(response.config.method as HttpMethodT)
                        ? {
                            success: true,
                            statusCode: response.status as statusCodesT,
                            response: response.data,
                        }
                        : false,
                }))

                

                setNumberOfPendingRequests(prev => prev - 1)

                return response
            },
            error => {

                const url: string = extractUrl(error.config.url || '')

                setNetwork(prev => ({
                    ...prev,
                    [url]: {
                        success: false,
                        statusCode: error.response.status,
                        response: error.response.data,
                    },
                }))

                setNumberOfPendingRequests(prev => prev - 1)

                throw error
            }
        )

        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptorId)
            axiosInstance.interceptors.response.eject(responseInterceptorId)
        }

    }, [axiosInstance])

    return {network, setNetwork, numberOfPendingRequests}
}