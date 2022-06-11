import React, { ReactElement, ReactNode, useMemo } from "react"
import { SwitchPropsI } from "../types/Switch.types"

export const Switch = <T,>(props: SwitchPropsI<T>): ReactElement | null => {

    const items: ReactNode[] = useMemo(() => {
        let itemsPlaceHolder: ReactNode[] = []
        let foundTrue: boolean = false
        for (let i = 0; i < props.children.length; i++) {
            const child = props.children[i]
            if (child.props.default) {
                itemsPlaceHolder.push(child.props.children) 
                break
            }
            if (foundTrue || child.props.value === props.expression) {
                itemsPlaceHolder.push(child.props.children) 
                foundTrue = true
            }
            if (foundTrue && child.props.break) break
        }
        return itemsPlaceHolder
    }, [props.children])

    return (
        <>
            {items}
        </>
    )
}