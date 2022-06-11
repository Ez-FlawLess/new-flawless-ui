import React, { Fragment, useMemo } from "react";
import { ReactElement } from "react";
import { ForPropsI } from "../types/For.types";

export const For = <T,>(props: ForPropsI<T>): ReactElement | null => {

    const listLength: number = useMemo(() => props.list.length, [props.list])

    return (
        <Fragment>
            {props.list.slice(0, 1).map((item, index) => props.firstItem ? props.firstItem(item, index) : props.children(item, index, true, false))}
            {props.list.slice(1, listLength - 1).map((item, index) => props.children(item, index, false, false))}
            {props.list.slice(listLength - 1, listLength).map((item, index) => props.firstItem ? props.firstItem(item, index) : props.children(item, index, false, true))}
        </Fragment>
    )
}