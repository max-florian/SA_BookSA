import { Request, Response, NextFunction } from "express";
import { verify, sign } from "jsonwebtoken";
import { setResponse } from "./response";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const secret = process.env.JWT_SECRET as string;
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (token) {
        verify(token, secret, (err, _) => {
            if (err) return setResponse(res, { statuscode: 401, message: 'Token inválido', data: {} });
            next();
        });
    } else {
        return setResponse(res, { statuscode: 400, message: 'Token no proveído.', data: {} });
    }
};

export function generateToken(payload: object) {
    const secret = process.env.JWT_SECRET as string;

    return sign(payload, secret, {
        expiresIn: '2h',
    });
}