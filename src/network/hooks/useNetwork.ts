import { AxiosInstance } from "axios";
import { useContext, useEffect, useState } from "react";
import { configContext } from "../../config/context/config.context";
import { HttpMethodT } from "../types/httpMethod.types";
import { NetworkI, networkContextI, SecondaryNetworksI, AxiosConfigT, AxiosInstanceI } from "../types/network.types";
import { statusCodesT } from "../types/statusCode.types";
import { extractUrl } from "../util/extractUrl";
import { GlobalFeedbacks } from "../types/HttpFeedback.types";

export const useNetwork = (axiosInstance?: AxiosConfigT, secondaryAxiosInstances: AxiosConfigT[] = []): networkContextI => {

    const config = useContext(configContext)

    const [network, setNetwork] = useState<NetworkI>({})
    const [numberOfPendingRequests, setNumberOfPendingRequests] = useState<number>(0)
    const [globalFeedbacks, setGlobalFeedbacks] = useState<GlobalFeedbacks[]>([])

    const [secondaryNetworks, setSecondaryNetworks] = useState<SecondaryNetworksI>({})

    useEffect(() => {

        if (axiosInstance !== undefined) {
            const ai: AxiosInstance = (axiosInstance as AxiosInstanceI).instance ? (axiosInstance as AxiosInstanceI).instance : (axiosInstance as AxiosInstance) 

            const requestInterceptorId = ai.interceptors.request.use(
                config => {

                    const url: string = extractUrl(config.url || '')

                    setNetwork(prev => ({
                        ...prev,
                        [url]: true,
                    }))

                    setNumberOfPendingRequests(prev => prev + 1)

                    return (axiosInstance as AxiosInstanceI).onConfig?.(config) ?? config
                },
                error => {
                    error = (axiosInstance as AxiosInstanceI).onConfigError?.(error) ?? error
                    throw error
                },
            )

            const responseInterceptorId = ai.interceptors.response.use(
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

                    return (axiosInstance as AxiosInstanceI).onResponse?.(response) ?? response
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

                    error = (axiosInstance as AxiosInstanceI).onResponseError?.(error) ?? error
                    throw error
                }
            )

            return () => {
                ai.interceptors.request.eject(requestInterceptorId)
                ai.interceptors.response.eject(responseInterceptorId)
            }
        }

    }, [axiosInstance])

    useEffect(() => {

        const interceptorIds: {
            requestInterceptorId: number,
            responseInterceptorId: number,
        }[] = secondaryAxiosInstances.map(sai => {

            const ai: AxiosInstance = (sai as AxiosInstanceI).instance ? (sai as AxiosInstanceI).instance : (sai as AxiosInstance) 

            const requestInterceptorId = ai.interceptors.request.use(
                config => {

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

                    setNumberOfPendingRequests(prev => prev + 1)

                    return (sai as AxiosInstanceI).onConfig?.(config) ?? config
                },
                error => {
                    error = (sai as AxiosInstanceI).onConfigError?.(error) ?? error
                    throw error
                },
            )

            const responseInterceptorId = ai.interceptors.response.use(
                response => {
    
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

                    setNumberOfPendingRequests(prev => prev - 1)

                    return (sai as AxiosInstanceI).onResponse?.(response) ?? response
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

                    setNumberOfPendingRequests(prev => prev - 1)

                    error = (sai as AxiosInstanceI).onResponseError?.(error) ?? error
                    throw error
                }
            )

            return {
                requestInterceptorId,
                responseInterceptorId,
            }
            
        })

        return () => {
            secondaryAxiosInstances.forEach((sai, index) => {
                const ai: AxiosInstance = (sai as AxiosInstanceI).instance ? (sai as AxiosInstanceI).instance : (sai as AxiosInstance) 
                ai.interceptors.request.eject(interceptorIds[index].requestInterceptorId)
                ai.interceptors.response.eject(interceptorIds[index].responseInterceptorId)
            })
        }

    }, [secondaryAxiosInstances])

    return {network, setNetwork, numberOfPendingRequests, secondaryNetworks, setSecondaryNetworks, globalFeedbacks, setGlobalFeedbacks}
}