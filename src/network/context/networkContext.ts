import { createContext } from "react";
import { networkContextI } from "../types/network.types";

export const networkContext = createContext<networkContextI>({
    network: {},
    setNetwork: () => null,
    numberOfPendingRequests: 0,
    secondaryNetworks: {},
    setSecondaryNetworks: () => null,
    globalFeedbacks: [],
    setGlobalFeedbacks: () => null,
})