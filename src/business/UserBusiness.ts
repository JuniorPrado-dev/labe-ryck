import { InvalidPassword, InvalidToken } from './../error/customError';
import { UserDatabase } from "../data/UserDatabase";
import { CustomError, InvalidEmail, InvalidLogin, UsedEmail, UserNotFound } from "../error/customError";
import { LoginInputDTO, SingUpInputDTO, UserDTO, UserOutputDTO } from "../model/userDTO";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";
import { emailServer } from "../services/emailServer";


export class UserBusiness {

  private userDatabase = new UserDatabase();
  private tokenGenerator = new TokenGenerator()

  public singUp = async (input: SingUpInputDTO): Promise<void> => {
    try {

      const { email, name } = input;
      if (!email || !name) {
        throw new InvalidEmail;
      }

      const userTest = await this.userDatabase.findUser(email);

      if (userTest) {
        throw new UsedEmail();
      }

      //cria senha aleatória
      // Gera um número aleatório de 0000 a 9999
      const randomNumber = Math.floor(Math.random() * 10000);

      // Preenche com zeros à esquerda, se necessário
      const formattedNumber = String(randomNumber).padStart(4, '0');
      console.log(formattedNumber);
      const password = `rick${formattedNumber}`;
      //criptografa senha
      const hash = await HashManager.generateHash(password)
      //add novo user
      const user: UserDTO = {
        id: IdGenerator.generateId(),
        name,
        email,
        password: hash
      }
      await this.userDatabase.insertUser(user)
      //enviar email
      await emailServer(user.email, user.name, password);


    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };


  public login = async (input: LoginInputDTO): Promise<string> => {
    try {
      //testa se tem email e password
      const { email, password } = input;
      if (!email || !password) {
        throw new InvalidLogin;
      }

      //encontar user pelo email
      const user: UserDTO = await this.userDatabase.findUser(email);
      if (!user) {
        throw new UserNotFound;
      }
      //testa se a senha bate
      const isValid = await HashManager.compareHash(password, user.password);
      if (!isValid) {
        throw new InvalidPassword;
      }
      //gerar token
      const token = TokenGenerator.generateToken(user.id);
      return token;
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };
  //get user
  public getUser = async (token: string): Promise<UserOutputDTO> => {
    try {
      //testa se tem token
      if (!token) {
        throw new InvalidToken;
      }
      //testa se o token bate
      const isValid = TokenGenerator.tokenData(token);
      if (!isValid) {
        throw new InvalidToken;
      }
      //encontar user pelo id
      const user: UserOutputDTO = await this.userDatabase.findUserById(isValid.id);

      return user;
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }
}
