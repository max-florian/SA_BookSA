import { Request, Response } from "express";
import { setResponse } from "./response";
import { generateToken } from "./jwt";
import bcrypt from "bcrypt";


const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
}

const comparePasswords = async (password: string, hashPassword: string) => {
    return await bcrypt.compare(password, hashPassword);
}

export const login = async (req: Request, res: Response) => {
    setResponse(res, {
        message: 'Iniciar sesion',
        statuscode: 200,
        data: {}
    })
}

export const register = async (req: Request, res: Response) => {
    setResponse(res, {
        message: 'Registro',
        statuscode: 200,
        data: {}
    })
}