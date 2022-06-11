import { ReactNode  } from "react";

export interface LoadingPropsI {
    url: string,
    children: (loading: boolean) => ReactNode,
}