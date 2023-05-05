import * as jwt from 'jsonwebtoken'
import { Unauthorized } from '../error/customError'

export class TokenGenerator {

    public generateToken = (id: string) => {
        const token = jwt.sign(
            { id },
            process.env.JWT_KEY as string,
            { expiresIn: "1d" }
        )
        return token
    }

    public tokenData = (token: string) => {
        // const payload = jwt.verify(
        //     token,
        //     process.env.JWT_KEY as string
        // ) as jwt.JwtPayload
        // return {id: payload.id as string,role:payload.role as string}
        try {
            const payload = jwt.verify(
                token,
                process.env.JWT_KEY as string
            );
            return {payload};
        } catch (error: any) {
            console.log(error.message)
            throw new Unauthorized()
        }
    };
}
