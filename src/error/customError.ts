export class CustomError extends Error {
    constructor(statusCode: number, message: string){
        super(message)
    }
}
export class InvalidEmail extends CustomError{ 
    constructor(){
        super(422, "Email ou nome inválidos!")
    }
}
export class InvalidData extends CustomError{ 
    constructor(){
        super(400, "Dados inválidos!")
    }
}
export class InvalidPassword extends CustomError{ 
    constructor(){
        super(401, "Senha inválida!")
    }
}
export class InvalidToken extends CustomError{ 
    constructor(){
        super(401, "Token inválido ou inspirado!")
    }
}
export class UserNotFound extends CustomError{ 
    constructor(){
        super(404, "Pessoa Usuária não encontrada!")
    }
}
export class InvalidLogin extends CustomError{ 
    constructor(){
        super(422, "Coloque email e senha!")
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