export default class ClientError extends Error {
    constructor(httpStatusCode?: number, message?: string) {
        super(message)
        this.httpStatusCode = httpStatusCode
    }
    httpStatusCode?: number
}