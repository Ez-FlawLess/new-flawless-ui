import { IfElsePropsI } from "conditional/types/IfElse.types";
import React from "react";
import { ReactElement, useMemo } from "react";

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