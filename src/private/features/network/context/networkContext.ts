import { createContext } from "react";
import { networkContextT } from "../types/network.types";

export const networkContext = createContext<networkContextT>([
    {},
    () => null,
])