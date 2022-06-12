import { createContext } from "react";
import { ConfigI } from "../types/config.types";

export const configContext = createContext<ConfigI>({})