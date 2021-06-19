import { Table, Column, Model, CreatedAt, Unique, Length, IsAlpha, IsEmail, BeforeCreate } from 'sequelize-typescript'
import { Optional } from 'sequelize';
import { hashPassword } from "../../controllers/crypt";

interface UserAttributes {
    name: string;
    lastname: string;
    email: string;
    password: string;
    phone: string;
    status: number;
    type: string;
    createdAt: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'createdAt'> { }

@Table({
    modelName: 'usuarios',
    updatedAt: false,
})
export default class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    @Length({ min: 3, max: 45, msg: 'El nombre tiene que ser entre 3 y 45 caracteres' })
    @Column({ field: 'nombre' })
    name!: string

    @Length({ min: 3, max: 45, msg: 'El apellido tiene que ser entre 3 y 45 caracteres' })
    @Column({ field: 'apellido' })
    lastname!: string

    @Unique({msg: 'Ya hay una cuenta con el correo electrónico', name: 'usuarios.correo_UNIQUE' })
    @IsEmail
    @Length({ max: 100, msg: 'El correo tiene que ser menor a 100 caracteres' })
    @Column({ field: 'correo' })
    email!: string

    @Length({ min: 8, msg: 'La clave tiene que ser de al menos 8 caracteres' })
    @Column({ field: 'clave' })
    password!: string

    @Column({ field: 'telefono' })
    phone!: string

    @Column({ field: 'estado' })
    status!: number

    @Length({ min: 3, max: 10, msg: 'El tipo tiene que ser entre 3 y 10 caracteres' })
    @Column({ field: 'tipo' })
    type!: string

    @CreatedAt
    @Column({ field: 'fecha_creado' })
    readonly createdAt!: Date

    @BeforeCreate
    static async hashPassword(user: User) {
        user.password = await hashPassword(user.password);
    }
}