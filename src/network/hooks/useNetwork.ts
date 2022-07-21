import { AxiosInstance } from "axios";
import { useContext, useEffect, useState } from "react";
import { configContext } from "../../config/context/config.context";
import { HttpMethodT } from "../types/httpMethod.types";
import { NetworkI, networkContextI, SecondaryNetworksI } from "../types/network.types";
import { statusCodesT } from "../types/statusCode.types";
import { extractUrl } from "../util/extractUrl";

export const useNetwork = (axiosInstance: AxiosInstance, secondaryAxiosInstances: AxiosInstance[] = []): networkContextI => {

    const config = useContext(configContext)

    const [network, setNetwork] = useState<NetworkI>({})
    const [numberOfPendingRequests, setNumberOfPendingRequests] = useState<number>(0)

    const [secondaryNetworks, setSecondaryNetworks] = useState<SecondaryNetworksI>({})

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

    useEffect(() => {

        console.log('secondaryAxiosInstances', secondaryAxiosInstances)

        const interceptorIds: {
            requestInterceptorId: number,
            responseInterceptorId: number,
        }[] = secondaryAxiosInstances.map(ai => {

            const requestInterceptorId = ai.interceptors.request.use(
                config => {
                    console.log('config', config)

                    const url: string = extractUrl(config.url || '')

                    const baseURL = config.baseURL

                    if (!baseURL) return config
    
                    setSecondaryNetworks(prev => ({
                        ...prev,
                        [baseURL]: {
                            ...prev[baseURL],
                            [url]: true,
                        },
                    }))
    
                    return config
                },
                error => {
                    throw error
                },
            )

            const responseInterceptorId = ai.interceptors.response.use(
                response => {

                    console.log('response',response )
    
                    const url: string = extractUrl(response.config.url || '')

                    const baseURL = response.config.baseURL

                    if (!baseURL) return response

                    setSecondaryNetworks(prev => ({
                        ...prev,
                        [baseURL]: {
                            ...prev[baseURL],
                            [url]: config.httpMethods?.includes(response.config.method as HttpMethodT)
                                ? {
                                    success: true,
                                    statusCode: response.status as statusCodesT,
                                    response: response.data,
                                }
                                : false,
                        },
                    }))
    
                    return response
                },
                error => {
    
                    const url: string = extractUrl(error.config.url || '')

                    const baseURL = error.config.baseURL

                    if (!baseURL) throw error

                    setSecondaryNetworks(prev => ({
                        ...prev,
                        [baseURL]: {
                            ...prev[baseURL],
                            [url]: {
                                success: false,
                                statusCode: error.response.status,
                                response: error.response.data,
                            },
                        },
                    }))
    
                    throw error
                }
            )

                return {
                    requestInterceptorId,
                    responseInterceptorId,
                }
            
        })

        return () => {
            secondaryAxiosInstances.forEach((ai, index) => {
                ai.interceptors.request.eject(interceptorIds[index].requestInterceptorId)
                ai.interceptors.response.eject(interceptorIds[index].responseInterceptorId)
            })
        }

    }, [secondaryAxiosInstances])

    return {network, setNetwork, numberOfPendingRequests, secondaryNetworks, setSecondaryNetworks}
}