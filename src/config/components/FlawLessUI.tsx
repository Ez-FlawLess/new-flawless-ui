import React,{ FC, PropsWithChildren } from "react";
import { Network } from "network/components/Network";
import { FlawLessUIPropsI } from "../types/FlawLessUI.types";

export const FlawLessUI: FC<PropsWithChildren<FlawLessUIPropsI>> = props => {
    return (
        <Network axiosInstance={props.axiosInstance}>
            {props.children}
        </Network>
    )
}