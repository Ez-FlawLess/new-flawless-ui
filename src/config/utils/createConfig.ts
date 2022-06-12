import { DEFAULT_HTTP_METHODS } from "../../network/constants/httpMethods.constants"
import { STATUS_CODE_MESSAGES } from "../../network/constants/statusCodes.constants"
import { ConfigI } from "../types/config.types"

export const createConfig = (config: ConfigI): ConfigI => {
    return {
        httpMethods: DEFAULT_HTTP_METHODS,
        statusCodeMessages: STATUS_CODE_MESSAGES,
        
        ...config,
    }
}