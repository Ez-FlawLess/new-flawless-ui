export const extractUrl = (fullUrl: string): string => {
    const index = fullUrl.indexOf('?')
    if (index === -1) return fullUrl
    return fullUrl.slice(0, index)
}