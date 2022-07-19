import { CONFIG_DEFAULT } from "../constants/config.constants"
import { ConfigI } from "../types/config.types"

export const createConfig = (config: ConfigI): ConfigI => {
    return {
        ...CONFIG_DEFAULT,
        ...config,
    }
}