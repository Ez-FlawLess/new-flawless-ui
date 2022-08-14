import { DependencyList, useEffect } from "react";

export const useWindowResize = (callback: (this: Window, ev: UIEvent) => any, dep: DependencyList = []) => {

    useEffect(() => {
        window.addEventListener('resize', callback)
        return () => {
            window.removeEventListener('resize', callback)
        }
    }, dep)

}