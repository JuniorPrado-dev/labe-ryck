import { UserDatabase } from "../data/UserDatabase";
import { CustomError, InvalidEmail, UsedEmail } from "../error/customError";
import { SingUpInputDTO, UserDTO} from "../model/userDTO";
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
  // public createUser = async (input: UserInputDTO): Promise<string> => {
  //   try {
  //     const { name, nickname, email, password,role } = input;
   
  //     if (!name || !nickname || !email || !password || !role) {
  //       throw new CustomError(
  //         400,
  //         'Preencha os campos "name","nickname", "email", "password" e "role"'
  //       );
  //     }

  //     if (name.length < 4) {
  //       throw new InvalidName();
  //     }

  //     if (!email.includes("@")) {
  //       throw new InvalidEmail();
  //     }

  //     if (role.toUpperCase() !== UserRole.ADMIN &&  role.toUpperCase() !== UserRole.NORMAL ){
  //         throw new InvalidRole();
  //     }

  //     const id: string = idGenerator.generateId()

  //     const hashPassword: string = await hashManager.generateHash(password) 

  //     const user: user = {
  //       id,
  //       name,
  //       nickname,
  //       email,
  //       password:hashPassword,
  //       role
  //     };
   
  //     await userDatabase.insertUser(user);
  //     const token = tokenGenerator.generateToken(id,role)

  //     return token
  //   } catch (error: any) {
  //     throw new CustomError(400, error.message);
  //   }
  // };

  

  // public editUser = async (input: EditUserInputDTO) => {
  //   try {
  //     const { name, nickname, id, token } = input;

  //     if (!name || !nickname || !id || !token) {
  //       throw new CustomError(
  //         400,
  //         'Preencha os campos "id", "name", "nickname" e "token"'
  //       );
  //     }

  //     const data = tokenGenerator.tokenData(token)

  //     // if(!data) {
  //     //   throw new Unauthorized()
  //     // }
      
  //     if (name.length < 4) {
  //       throw new InvalidName();
  //     }
  //     //testa autorização
  //     if(data.role !=UserRole.ADMIN) {
  //       throw new Unauthorized()
  //     }


  //     const editUserInput: EditUserInput = {
  //       id,
  //       name,
  //       nickname,
  //     };

  //     const userDatabase = new UserDatabase();
  //     await userDatabase.editUser(editUserInput);
  //   } catch (error: any) {
  //     throw new CustomError(400, error.message);
  //   }
  // };
}
