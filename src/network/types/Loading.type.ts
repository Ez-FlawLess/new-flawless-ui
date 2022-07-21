import { ReactNode  } from "react";

export interface LoadingPropsI {
    url: string,
    baseUrl?: string
    children: (loading: boolean) => ReactNode,
}