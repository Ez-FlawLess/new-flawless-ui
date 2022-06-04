export const extractUrl = (fullUrl: string): string => {
    const index = fullUrl.indexOf('?')
    return fullUrl.slice(0, index)
}