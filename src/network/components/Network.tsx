import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import { useNetwork } from "../hooks/useNetwork";
import { NetworkPropsI } from "../types/network.types";
import { networkContext } from '../context/networkContext'

export const Network: FC<PropsWithChildren<NetworkPropsI>> = props => {

    const networkState = useNetwork(props.axiosInstance, props.secondaryAxiosInstances)

    const [effectCalled, setEffectCalled] = useState<boolean>(false)

    useEffect(() => {
        if (!effectCalled) setEffectCalled(true)
    }, [effectCalled])

    if (effectCalled) return (
        <networkContext.Provider value={networkState}>
            {props.children}
        </networkContext.Provider>
    )
    return null
}