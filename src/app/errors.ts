
export class ServerSideError extends Error {

    constructor(public errors, message = "Errors on server side.") {
        super(message);
        this.errors = errors
        Object.setPrototypeOf(this, ServerSideError.prototype);
    }
}