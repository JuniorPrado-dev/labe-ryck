import * as jwt from 'jsonwebtoken'
import { Unauthorized } from '../error/customError'
import { AuthenticationData } from '../model/api'

export class TokenGenerator {

    public generateToken = (id: string, role: string) => {
        const token = jwt.sign(
            { id, role },
            process.env.JWT_KEY as string,
            { expiresIn: "1h" }
        )
        return token
    }

    public tokenData = (token: string): AuthenticationData => {
        // const payload = jwt.verify(
        //     token,
        //     process.env.JWT_KEY as string
        // ) as jwt.JwtPayload
        // return {id: payload.id as string,role:payload.role as string}
        try {
            const payload = jwt.verify(
                token,
                process.env.JWT_KEY as string
            ) as AuthenticationData;
            return payload;
        } catch (error: any) {
            console.log(error.message)
            throw new Unauthorized()
        }
    };
}
