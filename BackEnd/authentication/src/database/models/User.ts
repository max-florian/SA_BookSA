import { Model, DataTypes } from "sequelize";
import sequelize from "../../database";

interface IUser {
    nombre: string;
    apellido: string;
    correo: string;
    clave: string;
    telefono: string;
    estado: number;
    tipo: string;
    fecha_creado?: string;
}

class User extends Model<IUser> { }

User.init({
    nombre: {
        type: DataTypes.STRING,
        validate: {
            len: {
                args: [3, 45],
                msg: 'El nombre tiene que ser entre 3 y 45 caracteres'
            },
            isAlpha: {
                msg: 'El nombre solo puede contener letras'
            }
        }
    },
    apellido: {
        type: DataTypes.STRING,
        validate: {
            len: {
                args: [3, 45],
                msg: 'El apellido tiene que ser entre 3 y 45 caracteres'
            },
            isAlpha: {
                msg: 'El apellido solo puede contener letras'
            }
        }
    },
    correo: {
        type: DataTypes.STRING,
        validate: {
            len: {
                args: [6, 100],
                msg: 'El correo tiene que ser entre 6 y 100 caracteres'
            },
            isEmail: {
                msg: 'Debe ser un correo válido'
            }
        }
    },
    clave: {
        type: DataTypes.STRING,
        validate: {
            len: {
                args: [8, 20],
                msg: 'La clave tiene que ser entre 8 y 20 caracteres'
            },
        }
    },
    telefono: {
        type: DataTypes.STRING,
        validate: {
            len: {
                args: [8, 15],
                msg: 'El telefono tiene que ser entre 8 y 15 caracteres'
            },
        }
    },
    estado: {
        type: DataTypes.INTEGER,
        validate: {
            isIn: [['0', '1', '2']]
        }
    },
    tipo: {
        type: DataTypes.STRING,
        validate: {
            len: {
                args: [3, 10],
                msg: 'El tipo tiene que ser entre 3 y 10 caracteres'
            },
        }
    },
}, { sequelize, modelName: 'usuarios', createdAt: 'fecha_creado', updatedAt: false });

export default User;