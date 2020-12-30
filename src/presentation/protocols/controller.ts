import { HttpMethod, HttpRequest, HttpResponse } from "./http";

export interface Controller {
    handle(httpMethod: HttpMethod, httpRequest: HttpRequest): Promise<HttpResponse>;
}