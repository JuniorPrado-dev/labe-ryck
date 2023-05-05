import * as bcrypt from "bcryptjs"

export class HashManager {

    static generateHash = async (password: string): Promise<string> => {
        const cost:number =  Number(process.env.BCRYPT_COST)
        const salt:string = await bcrypt.genSalt(cost)
        const hash:string = await bcrypt.hash(password, salt)
        return hash
    }

    static compareHash = async (password: string, hashText: string): Promise<boolean>=> {
        const result = await bcrypt.compare(password,hashText )
        return result
    }
}