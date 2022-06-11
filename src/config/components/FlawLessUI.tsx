import React,{ FC, PropsWithChildren } from "react";
import { Network } from "../../network/components/Network";
import { FlawLessUIPropsI } from "../types/FlawLessUI.types";

export const FlawLessUI: FC<PropsWithChildren<FlawLessUIPropsI>> = ({config, children}) => {
    if (config.axiosInstance) return (
        <Network axiosInstance={config.axiosInstance}>
            {children}
        </Network>
    )
    return (
        <>
            {children}
        </>
    )
}