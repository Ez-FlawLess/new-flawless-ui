import React, { Fragment, useMemo } from "react";
import { ReactElement } from "react";

export const For = <T,>(props: {
    list: T[],
    children: (item: T, index?: number, isFirst?: boolean, isLast?: boolean) => ReactElement | ReactElement[],
}): ReactElement | null => {

    const lastIndex = useMemo(() => props.list.length - 1, [props.list])

    return (
        <Fragment>
            {props.list.map((item, index) => props.children(item, index, index === 0, index === lastIndex))}
        </Fragment>
    )
}