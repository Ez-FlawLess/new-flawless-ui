import { RefObject, useEffect } from "react"

const useRefEvent = <K extends keyof HTMLElementEventMap>(ref: RefObject<HTMLElement> | undefined, event: K, handleEvent: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any) => {
    useEffect(() => {
        const current = ref?.current
        if (current) {
            current.addEventListener(event, handleEvent)
            return () => {
                current.removeEventListener(event, handleEvent)
            }
        }
    }, [event, handleEvent, ref])
}

export default useRefEvent