import { AlertI, AlertsT } from "./alert.types";

export interface ComponentsI {
    alerts?: Record<AlertsT, AlertI>,
}