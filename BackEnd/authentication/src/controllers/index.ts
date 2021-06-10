import { Request, Response } from "express";
import { setResponse } from "./response";
import { generateToken } from "./jwt";
import bcrypt from "bcrypt";
import User from "../database/models/User";


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
    const { nombre, apellido, correo, clave, estado, telefono, tipo } = req.body;

    User.create({ nombre, apellido, correo, clave, estado, telefono, tipo })
        .then(() => {
            const token = generateToken({ correo, nombre, apellido })
            setResponse(res, {
                message: 'Registro exitoso',
                statuscode: 200,
                data: { token }
            })
        }).catch((error) => {
            setResponse(res, {
                message: 'Registro exitoso',
                statuscode: 500,
                data: { error }
            })
        });
}