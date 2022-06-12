import { FC } from "react";
import { HttpFeedbackPropsI } from "../types/HttpFeedback.types";

export const HttpFeedback: FC<HttpFeedbackPropsI> = props => {
    return null
}

HttpFeedback.defaultProps = {
    showError: true,
    showSuccess: true,
}