export interface HttpRequest {
    body?: any;
    params?: any;
}

export interface HttpResponse {
    statusCode: number;
    body?: any;
}

export type HttpMethod = "POST" | "PUT" | "GET" | "DELETE"