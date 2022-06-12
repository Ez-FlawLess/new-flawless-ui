import { AxiosInstance } from "axios";
import { HttpMethods } from "../../network/types/httpMethod.types";
import { StatusCodeMessagesI } from "../../network/types/statusCode.types";
import { ComponentsI } from "./components.types";

export interface ConfigI {
    axiosInstance?: AxiosInstance,
    components?: ComponentsI,
    statusCodeMessages?: StatusCodeMessagesI,
    httpMethods?: HttpMethods,
}