export enum ErrorCode {
    OK = 200,
    INVALID_REQUEST = 400,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
}

interface IErrorParser {
    body: any;
    statusCode: ErrorCode;
}

export class ErrorParser extends Error {
    readonly body: any;
    readonly statusCode: number;
    constructor(params: IErrorParser) {
        super(params.body);
        this.statusCode = params.statusCode;
    }
}