import { DependencyList, useEffect } from "react"

const useTimeout = (callback: Function, ms?: number, deps?: DependencyList) => {
    useEffect(() => {
        if (ms) {
            const timeoutId = setTimeout(() => {
                callback()
            }, ms)
    
            return () => {
                clearTimeout(timeoutId)
            }
        }
    }, deps)
}

export default useTimeout