import React,{ FC, PropsWithChildren } from "react";
import { Network } from "../../../private/features/network/components/Network";
import { FlawLessUIPropsI } from "./FlawLessUI.types";

export const FlawLessUI: FC<PropsWithChildren<FlawLessUIPropsI>> = props => {
    return (
        <Network axiosInstance={props.axiosInstance}>
            {props.children}
        </Network>
    )
}