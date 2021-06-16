import { Response } from "express";

interface IResponse {
    statuscode: number | string;
    message: string;
    data: object;
}

export function setResponse(res: Response, response: IResponse) {
    response.statuscode = typeof response.statuscode == "string" ? parseStatus[response.statuscode] || 500 : response.statuscode;
    res.statusCode = response.statuscode;
    res.json({ ...response });
}

const parseStatus: Record<string, number> = {
    SequelizeValidationError: 400
}