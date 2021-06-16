import { Request, Response } from "express";
import { setResponse } from "./response";
import { generateToken } from "./jwt";
import User from "../database/models/User";
import { comparePasswords } from "./crypt";

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } })

    const invalid = (status: number) => setResponse(res, {
        message: 'Correo o contraseña incorrecta',
        statuscode: status,
        data: {}
    })

    if (!user) return invalid(404);
    if (!await comparePasswords(password, user?.getDataValue('password'))) return invalid(401);

    const token = generateToken({
        email,
        name: user?.getDataValue('name'),
        lastname: user?.getDataValue('lastname')
    })

    setResponse(res, {
        message: 'Sesión iniciada con éxito',
        statuscode: 200,
        data: { token }
    })
}

export const register = async (req: Request, res: Response) => {
    const { name, lastname, email, password, status, phone, type } = req.body;

    User.create({ name, lastname, email, password, status, phone, type })
        .then(() => {
            const token = generateToken({ email, name, lastname })
            setResponse(res, {
                message: 'Registro exitoso',
                statuscode: 200,
                data: { token }
            })
        }).catch((error) => {
            setResponse(res, {
                message: 'No se pudo completar el registro',
                statuscode: error.name as string || 500,
                data: { errors: error.errors.map((err: any) => ({ message: err.message, value: err.value })) }
            })
        });
}



// curl --location --request POST 'http://localhost:4000/api/authentication/register' \
// --header 'Content-Type: application/json' \
// --data-raw '{"name": "Darwin", "lastname": "Arevalo", "email": "dalexis.da@gmail.com", "password": "password", "status": 0, "type": "cliente", "phone": "36054254" }'

// curl --location --request POST 'http://localhost:4000/api/authentication/login' \
// --header 'Content-Type: application/json' \
// --data-raw '{"email": "dalexis.da@gmail.com", "password": "password" }'