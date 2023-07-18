import { createContext } from "react";
import { networkContextI } from "../types/network.types";

export const networkContext = createContext<networkContextI>({
    network: {},
    setNetwork: () => null,
    numberOfPendingRequests: 0,
    setNumberOfPendingRequests: () => null,
    secondaryNetworks: {},
    setSecondaryNetworks: () => null,
    globalFeedbacks: [],
    setGlobalFeedbacks: () => null,
    newGlobalFeedback: () => null,
})