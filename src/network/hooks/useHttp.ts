import { useState } from "react"

export const useHttp = (): {
    loading: boolean,
    http: <T>(call: Promise<T>) => Promise<T>,
} => {

    const [loading, setLoading] = useState<boolean>(false)

    return {
        loading,
        http: async <T>(call: Promise<T>) => {
            try {
                setLoading(true)
                const res = await call

                setLoading(false)
                return res
            } catch (err: any) {
                setLoading(false)
                throw new Error(err)
            }
        }
    }
}
