import { useLoading } from "package/hooks";
import React from "react";
import { FC } from "react";
import { LoadingPropsI } from "../types/Loading.type";

export const Loading: FC<LoadingPropsI> = props => {

    const loading = useLoading(props.url)

    return <>
        {props.children(loading)}
    </>
}