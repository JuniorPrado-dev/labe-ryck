import { InvalidRole } from '../error/customError';
import { UserDatabase } from "../data/UserDatabase";
import { CustomError, InvalidEmail, InvalidName, InvalidPassword, Unauthorized, UserNotFound } from "../error/customError";
import {UserInputDTO,user,EditUserInputDTO,EditUserInput,LoginInputDTO, UserRole} from "../model/api";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";

const idGenerator = new IdGenerator()
const tokenGenerator = new TokenGenerator()
const userDatabase = new UserDatabase();
const hashManager = new HashManager()

export class ApiBusiness {
  public singUp = async (input: LoginInputDTO): Promise<string> => {
    try {
      const {email} = input;
    
      if (!email||!email.includes("@labenu.com.br") ) {
        throw new InvalidEmail;
      }
      
      const user = await userDatabase.findUser(email);

      if (!user) {
        throw new UserNotFound()
      }

      const compareResult: boolean = await hashManager.compareHash(password, user.password) 

      if(!compareResult){ 
        throw new InvalidPassword()
      } 
      
      const token = tokenGenerator.generateToken(user.id,user.role)
           
      return token
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };
  public createUser = async (input: UserInputDTO): Promise<string> => {
    try {
      const { name, nickname, email, password,role } = input;
   
      if (!name || !nickname || !email || !password || !role) {
        throw new CustomError(
          400,
          'Preencha os campos "name","nickname", "email", "password" e "role"'
        );
      }

      if (name.length < 4) {
        throw new InvalidName();
      }

      if (!email.includes("@")) {
        throw new InvalidEmail();
      }

      if (role.toUpperCase() !== UserRole.ADMIN &&  role.toUpperCase() !== UserRole.NORMAL ){
          throw new InvalidRole();
      }

      const id: string = idGenerator.generateId()

      const hashPassword: string = await hashManager.generateHash(password) 

      const user: user = {
        id,
        name,
        nickname,
        email,
        password:hashPassword,
        role
      };
   
      await userDatabase.insertUser(user);
      const token = tokenGenerator.generateToken(id,role)

      return token
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };

  

  public editUser = async (input: EditUserInputDTO) => {
    try {
      const { name, nickname, id, token } = input;

      if (!name || !nickname || !id || !token) {
        throw new CustomError(
          400,
          'Preencha os campos "id", "name", "nickname" e "token"'
        );
      }

      const data = tokenGenerator.tokenData(token)

      // if(!data) {
      //   throw new Unauthorized()
      // }
      
      if (name.length < 4) {
        throw new InvalidName();
      }
      //testa autorização
      if(data.role !=UserRole.ADMIN) {
        throw new Unauthorized()
      }


      const editUserInput: EditUserInput = {
        id,
        name,
        nickname,
      };

      const userDatabase = new UserDatabase();
      await userDatabase.editUser(editUserInput);
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };
}
