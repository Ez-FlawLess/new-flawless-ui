import React from "react";
import { FC, PropsWithChildren } from "react";
import { ShowPropsI } from "../types/Show.types";

export const Show: FC<PropsWithChildren<ShowPropsI>> = props => {
    if (props.when) return <>{props.children}</>
    return null
}