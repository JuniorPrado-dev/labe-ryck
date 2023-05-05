export class CustomError extends Error {
    constructor(statusCode: number, message: string){
        super(message)
    }
}
export class InvalidEmail extends CustomError{ 
    constructor(){
        super(422, "Email, senha ou nome inválidos!")
    }
}
export class UsedEmail extends CustomError{ 
    constructor(){
        super(400, "Email já utilizado")
    }
}
export class InvalidCharacterInfos extends CustomError{ 
    constructor(){
        super(400, "Verifique se todas informações foram passadas!")
    }
}

export class Unauthorized extends CustomError{ 
    constructor(){
        super(401, "Usuário não autorizado")
    }
}