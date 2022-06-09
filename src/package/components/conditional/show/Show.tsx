import React from "react";
import { FC, PropsWithChildren } from "react";
import { ShowPropsI } from "./Show.types";

export const Show: FC<PropsWithChildren<ShowPropsI>> = props => {
    if (props.when) return <>{props.children}</>
    return null
}