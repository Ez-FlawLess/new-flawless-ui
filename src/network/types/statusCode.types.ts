export type StatusCodeGroupT =  1 | 2 | 3 | 4 | 5

export type InformationStatusCodeT = 100 | 101 | 103

export type successfulStatusCodeT = 200 | 201 | 202 | 203 | 204 | 205 | 206

export type RedirectionSatusCodeT = 300 | 301 | 302 | 303 | 304 | 306 | 307 | 308

export type ClientErrorStatusCodeT = 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417

export type ServerErrorStatusCodeT = 500 | 501 | 502 | 503 | 504 | 505 | 511

export interface StatusCodeMessageT<T = string> {
    title?: string,
    message: T extends string ? string : T,
}

export interface StatusCodeMessagesI<T = any> {
    success?: StatusCodeMessageT,
    error?: StatusCodeMessageT<(data: T) => string>,
    1: StatusCodeMessageT<Record<InformationStatusCodeT, string>>,
    2: StatusCodeMessageT<Record<successfulStatusCodeT, string>>,
    3: StatusCodeMessageT<Record<RedirectionSatusCodeT, string>>,
    4: StatusCodeMessageT<Record<ClientErrorStatusCodeT, string>>,
    5: StatusCodeMessageT<Record<ServerErrorStatusCodeT, string>>,
}