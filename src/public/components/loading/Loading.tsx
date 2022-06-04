import { networkContext } from "private/features/network/context/networkContext";
import { useLoading } from "public/hooks";
import React from "react";
import { FC, useContext, useEffect, useState } from "react";
import { LoadingPropsI } from "./Loading.type";

export const Loading: FC<LoadingPropsI> = props => {

    const loading = useLoading(props.url)

    return <>
        {props.children(loading)}
    </>
}