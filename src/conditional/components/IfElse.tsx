import React, { ReactElement, useMemo } from "react";
import { IfElsePropsI } from "../types/IfElse.types";

export const IfElse = (props: IfElsePropsI): ReactElement | null => {

    const index = useMemo(() => props.children.findIndex(comp => comp.props.when), [props.children])

    if (index !== -1) return (
        <>
            {props.children[index].props.children}
        </>
    )
    return (
        null
    )
}