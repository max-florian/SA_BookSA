import { Response } from "express";

interface IResponse {
    statuscode: number | string;
    message: string;
    data: object;
}

export function setResponse(res: Response, response: IResponse) {
    res.statusCode = typeof response.statuscode == "string" ? parseStatus[response.statuscode] : response.statuscode;
    res.json({ ...response });
}

const parseStatus: Record<string, number> = {
    SequelizeValidationError: 400
}