import { Response } from "express";

interface IResponse {
    statuscode: number;
    message: string;
    data: object;
}

export function setResponse(res: Response, response: IResponse) {
    res.statusCode = response.statuscode;
    res.json({ ...response });
}