export interface AlertI {
    title?: string,
    message: string,
    onClose?: () => any,
}

export type AlertsT = 'success' | 'error'