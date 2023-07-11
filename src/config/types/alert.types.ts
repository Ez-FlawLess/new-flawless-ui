import { StatusCodeGroupT, statusCodesT } from "../../network/types/statusCode.types";

export interface AlertI<T = any> {
    title?: string,
    message: string,
    onClose?: () => any,
    props?: T,
    statusCodeGroup: StatusCodeGroupT,
    statusCode: statusCodesT,
}

export type AlertsT = 'success' | 'error'