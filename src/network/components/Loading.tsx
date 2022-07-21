import React from "react";
import { FC } from "react";
import { useLoading } from "../hooks/useLoading";
import { LoadingPropsI } from "../types/Loading.type";

export const Loading: FC<LoadingPropsI> = props => {

    const loading = useLoading(props.url, props.baseUrl)

    return <>
        {props.children(loading)}
    </>
}