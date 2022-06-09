import React, { Fragment, useMemo } from "react";
import { ReactElement } from "react";

type renderFunc<T> = (item: T, index?: number) => ReactElement | ReactElement[]
type renderFuncWithInfo<T> = (item: T, index?: number, isFirst?: boolean, isLast?: boolean) => ReactElement | ReactElement[]

export const For = <T,>(props: {
    list: T[],
    children: renderFuncWithInfo<T>,
    firstItem?: renderFunc<T>,
    lastItem?: renderFunc<T>,
}): ReactElement | null => {

    const listLength: number = useMemo(() => props.list.length, [props.list])

    return (
        <Fragment>
            {props.list.slice(0, 1).map((item, index) => props.firstItem ? props.firstItem(item, index) : props.children(item, index, true, false))}
            {props.list.slice(1, listLength - 1).map((item, index) => props.children(item, index, false, false))}
            {props.list.slice(listLength - 1, listLength).map((item, index) => props.firstItem ? props.firstItem(item, index) : props.children(item, index, false, true))}
        </Fragment>
    )
}