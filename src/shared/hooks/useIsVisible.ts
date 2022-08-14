import { DependencyList, RefObject, useEffect } from "react";

export const useIsVisible = (ref: RefObject<HTMLElement>, callback: () => void, deps: DependencyList = []) => {
    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                callback()
            }
        }
    )

    useEffect(() => {
        if (ref.current) {
            observer.observe(ref.current)
            return () => {
                observer.disconnect()
            }
        }
    }, [ref, ...deps])
}