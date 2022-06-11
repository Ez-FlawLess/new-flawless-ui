import { PropsWithChildren, ReactElement } from "react";
import { ShowPropsI } from "./Show.types";

export interface IfElsePropsI {
    children: ReactElement<PropsWithChildren<ShowPropsI>>[],
}