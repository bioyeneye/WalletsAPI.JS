export interface BaseResponseMode<T> {
    Response?: Response;
    Data?: T;
}

export interface Response {
    ResponseCode: string;
    Message: string;
}