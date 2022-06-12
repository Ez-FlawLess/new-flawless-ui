import { ReactElement } from "react";
import { AlertI, AlertsT } from "./alert.types";

export interface ComponentsI {
    alerts?: Record<AlertsT, (propss: AlertI) => ReactElement>,
}