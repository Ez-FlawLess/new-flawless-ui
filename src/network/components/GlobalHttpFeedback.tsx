import { FC, ReactElement, useContext } from "react";
import { networkContext } from "../context/networkContext";
import { AlertI } from "../../package";
import React from "react";

export const GlobalHttpFeedback: FC<{
    children: (feedbacks: AlertI & { id: number }) => ReactElement,
}> = props => {

    const { globalFeedbacks, setGlobalFeedbacks } = useContext(networkContext)

    const handleClose = (id: number) => {
        setGlobalFeedbacks(p => p.filter(f => f.id !== id))
    }

    return (
        <>
            {globalFeedbacks.map(feedback => props.children({
                id: feedback.id,
                title: feedback.title,
                message: feedback.message,
                onClose: () => handleClose(feedback.id),
                props: {},
                statusCode: feedback.statusCode,
                statusCodeGroup: feedback.statusCodeGroup,
            }))}
        </>
    )
}
