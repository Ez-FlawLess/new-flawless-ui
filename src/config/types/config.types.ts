import { HttpMethodsT } from "../../network/types/httpMethod.types";
import { AxiosConfigT } from "../../network/types/network.types";
import { StatusCodeMessagesI } from "../../network/types/statusCode.types";
import { ComponentsI } from "./components.types";

export interface ConfigI {
    axiosInstance?: AxiosConfigT,
    secondaryAxiosInstances?: AxiosConfigT[],
    components?: ComponentsI,
    statusCodeMessages?: StatusCodeMessagesI,
    httpMethods?: HttpMethodsT,
    httpTimer?: number,
    globalHttpFeedback?: boolean,
}