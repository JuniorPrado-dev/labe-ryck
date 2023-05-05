import { CustomError } from "../error/customError";
import { UserDTO } from "../model/userDTO";
import { BaseDatabase } from "./BaseDatabase";

export class CharacterDatabase extends BaseDatabase {
  
  public insertCharacter = async (user: UserDTO) => {
    try {
      await CharacterDatabase.connection
        .insert(user)
        .into("users");
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };
  
  public allCharacter = async () => {
    try {
  
      const result = await CharacterDatabase.connection("chacters")
        .select('*');
      return result[0];
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };

  // public editUser = async (user: EditUserInput) => {
  //   try {
  //     await UserDatabase.connection
  //       .update({ name: user.name, nickname: user.nickname })
  //       .where({ id: user.id })
  //       .into("Auth_users");
  //   } catch (error: any) {
  //     throw new CustomError(400, error.message);
  //   }
  // };
}
