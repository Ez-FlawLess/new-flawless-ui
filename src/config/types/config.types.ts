import { AxiosInstance } from "axios";
import { HttpMethodsT } from "../../network/types/httpMethod.types";
import { StatusCodeMessagesI } from "../../network/types/statusCode.types";
import { ComponentsI } from "./components.types";

export interface ConfigI {
    axiosInstance?: AxiosInstance,
    secondaryAxiosInstances?: AxiosInstance[],
    components?: ComponentsI,
    statusCodeMessages?: StatusCodeMessagesI,
    httpMethods?: HttpMethodsT,
}