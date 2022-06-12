import { AxiosInstance } from "axios";
import { StatusCodeMessagesI } from "../../network/types/statusCode.types";
import { ComponentsI } from "./components.types";

export interface ConfigI {
    axiosInstance?: AxiosInstance,
    components?: ComponentsI,
    statusCodeMessages?: StatusCodeMessagesI,
}