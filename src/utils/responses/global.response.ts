export enum ResponseCode {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    UNPROCESSABLE_ENTITY = 422,
    INTERNAL_SERVER_ERROR = 500,
}

export enum ResponseMessage {
    OK = 'OK',
    CREATED = 'Created',
    ACCEPTED = 'Accepted',
    BAD_REQUEST = 'Bad Request',
    UNAUTHORIZED = 'Unathorized',
    FORBIDDEN = 'Forbidden',
    NOT_FOUND = 'Not Found',
    CONFLICT = 'Conflict',
    UNPROCESSABLE_ENTITY = 'Unprocessable Entity',
    INTERNAL_SERVER_ERROR = 'Internal Server Error',
}

export class GlobalResponse<T>{
    public code: ResponseCode;
    public message?: ResponseMessage|string;
    public result?: T;
    constructor(
        code: ResponseCode,
        message?: ResponseMessage|string,
        result?: T
    ) {
        this.code = code || ResponseCode.INTERNAL_SERVER_ERROR;
        if (message) {
            this.message = message;
        } else {
            switch (code) {
                case ResponseCode.OK:
                    this.message = ResponseMessage.OK;
                    break;
                case ResponseCode.CREATED:
                    this.message = ResponseMessage.CREATED;
                    break;
                case ResponseCode.BAD_REQUEST:
                    this.message = ResponseMessage.BAD_REQUEST;
                    break;
                case ResponseCode.UNAUTHORIZED:
                    this.message = ResponseMessage.UNAUTHORIZED;
                    break;
                case ResponseCode.FORBIDDEN:
                    this.message = ResponseMessage.FORBIDDEN;
                    break;
                case ResponseCode.NOT_FOUND:
                    this.message = ResponseMessage.NOT_FOUND;
                    break;
                case ResponseCode.UNPROCESSABLE_ENTITY:
                    this.message = ResponseMessage.UNPROCESSABLE_ENTITY;
                    break;
                default:
                    this.message = ResponseMessage.INTERNAL_SERVER_ERROR;
                    break;
            }
        }
        this.result = result;
    }
}
