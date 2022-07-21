import React,{ FC, PropsWithChildren } from "react";
import { Network } from "../../network/components/Network";
import { FlawLessUIPropsI } from "../types/FlawLessUI.types";
import { configContext } from "../context/config.context";

export const FlawLessUI: FC<PropsWithChildren<FlawLessUIPropsI>> = ({config, children}) => {
    return (
        <configContext.Provider value={config}>
            {
                config.axiosInstance
                ?  <Network 
                        axiosInstance={config.axiosInstance} 
                        secondaryAxiosInstances={config.secondaryAxiosInstances}
                    >
                        {children}
                    </Network>
                : children
            }
        </configContext.Provider>
    )
}