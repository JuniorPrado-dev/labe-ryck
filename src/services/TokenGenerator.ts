import * as jwt from 'jsonwebtoken'
import { Unauthorized } from '../error/customError'
import { ValidateDTO } from '../model/userDTO'

export class TokenGenerator {

    static generateToken = (id: string) => {
        const token = jwt.sign(
            { id },
            process.env.JWT_KEY as string,
            { expiresIn: "1d" }
        )
        return token
    }

    static tokenData = (token: string) => {
        try {
            const payload = jwt.verify(
                token,
                process.env.JWT_KEY as string
            ) as ValidateDTO;
            return payload ;
        } catch (error: any) {
            console.log(error.message)
            throw new Unauthorized()
        }
    };
}
