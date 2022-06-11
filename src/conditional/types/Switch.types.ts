import { PropsWithChildren, ReactElement } from "react";
import { CasePropsI } from "./Case.types";

export interface SwitchPropsI<T> {
    expression: T,
    children: ReactElement<PropsWithChildren<CasePropsI<T>>>[],
}