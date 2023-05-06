import { CustomError } from "../error/customError";
import { UserDTO } from "../model/userDTO";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  
  public findUserById = async (id: string) => {
    try {
  
      const result = await UserDatabase.connection("users")
        .select()
        .where({id});
      return result[0];
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };

  public findUser = async (email: string) => {
    try {
  
      const result = await UserDatabase.connection("users")
        .select()
        .where({email});
      return result[0];
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };

  public insertUser = async (user: UserDTO) => {
    try {
      await UserDatabase.connection
        .insert(user)
        .into("users");
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };
}
