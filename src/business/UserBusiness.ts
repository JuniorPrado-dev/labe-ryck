import { InvalidPassword } from './../error/customError';
import { UserDatabase } from "../data/UserDatabase";
import { CustomError, InvalidEmail, InvalidLogin, UsedEmail, UserNotFound } from "../error/customError";
import { LoginInputDTO, SingUpInputDTO, UserDTO} from "../model/userDTO";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";
import { emailServer } from "../services/emailServer";


export class UserBusiness {
  
  private userDatabase = new UserDatabase();
  private tokenGenerator = new TokenGenerator()
  
  public singUp = async (input: SingUpInputDTO): Promise<void> => {
    try {

      const {email, name,password} = input;
      if (!email||!name||!password) {
        throw new InvalidEmail;
      }
      
      const userTest = await this.userDatabase.findUser(email);

      if (userTest) {
        throw new UsedEmail();
      }
      //criptografa senha
      const hash = await HashManager.generateHash(password)
      //add novo user
      const user:UserDTO ={
        id: IdGenerator.generateId(),
        name,
        email,
        password:hash
      } 
      await this.userDatabase.insertUser(user)
      //enviar email
      await emailServer(user.email,user.name,password);
      

    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };
  
  
  public login = async (input: LoginInputDTO): Promise<string> => {
    try {
      //testa se tem email e password
      const {email,password} = input;
      if (!email||!password) {
        throw new InvalidLogin;
      }
      
      //encontar user pelo email
      const user:UserDTO = await this.userDatabase.findUser(email);
      if (!user) {
        throw new UserNotFound;
      }
      //testa se a senha bate
      const isValid = await HashManager.compareHash(password,user.password);
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
}
