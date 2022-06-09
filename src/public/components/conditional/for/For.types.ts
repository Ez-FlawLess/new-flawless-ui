import { ReactElement } from "react"

export type renderFunc<T> = (item: T, index?: number) => ReactElement | ReactElement[]
export type renderFuncWithInfo<T> = (item: T, index?: number, isFirst?: boolean, isLast?: boolean) => ReactElement | ReactElement[]

export interface ForPropsI<T> {
    list: T[],
    children: renderFuncWithInfo<T>,
    firstItem?: renderFunc<T>,
    lastItem?: renderFunc<T>,
} 