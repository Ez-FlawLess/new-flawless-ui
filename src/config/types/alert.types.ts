export interface AlertI<T = any> {
    title?: string,
    message: string,
    onClose?: () => any,
    props?: T,
}

export type AlertsT = 'success' | 'error'