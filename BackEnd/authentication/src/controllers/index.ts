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
    const { correo, clave } = req.body;

    const user = await User.findOne({ where: { correo } })

    const invalid = (status: number) => setResponse(res, {
        message: 'Correo o contraseña incorrecta',
        statuscode: status,
        data: {}
    })

    if (!user) return invalid(404);
    if (await comparePasswords(clave, user._attributes.clave)) return invalid(401);

    const token = generateToken({
        correo,
        nombre: user._attributes.nombre,
        apellido: user._attributes.apellido
    })

    setResponse(res, {
        message: 'Sesión iniciada con éxito',
        statuscode: 200,
        data: { token }
    })
}

export const register = async (req: Request, res: Response) => {
    const { nombre, apellido, correo, clave, estado, telefono, tipo } = req.body;

    User.create({ nombre, apellido, correo, clave: await hashPassword(clave), estado, telefono, tipo })
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