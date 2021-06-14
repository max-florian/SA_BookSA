import { Request, Response, NextFunction } from "express";
import { verify, sign } from "jsonwebtoken";
import { setResponse } from "./response";
import { JWT_SECRET, JWT_DURATION } from "../../env";

export const verifyToken = (req: Request, res: Response) => {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (token) {
        verify(token, JWT_SECRET, (err, _) => {
            if (err) return setResponse(res, { statuscode: 401, message: 'Token inválido', data: {} });
            setResponse(res, {statuscode: 200, message: 'Token correcto', data: {}});
        });
    } else {
        return setResponse(res, { statuscode: 400, message: 'Token no proveído.', data: {} });
    }
};

export const generateToken = (payload: object) => {
    return sign(payload, JWT_SECRET, {
        expiresIn: JWT_DURATION,
    });
}