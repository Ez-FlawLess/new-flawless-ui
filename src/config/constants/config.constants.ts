import { HTTP_METHODS } from "../../network/constants/httpMethods.constants";
import { STATUS_CODE_MESSAGES } from "../../network/constants/statusCodes.constants";
import { ConfigI } from "../types/config.types";

export const CONFIG_DEFAULT: ConfigI = {
    statusCodeMessages: STATUS_CODE_MESSAGES,
    httpMethods: HTTP_METHODS,
}