import { CustomError } from "../error/customError";
import { CharacterDTO } from "../model/characterDTO";
import { UserDTO } from "../model/userDTO";
import { BaseDatabase } from "./BaseDatabase";

export class CharacterDatabase extends BaseDatabase {
  
  public createCharacter = async (character: CharacterDTO) => {
    try {
      await CharacterDatabase.connection
        .insert(character)
        .into("characters");
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };
  
  public getAllCharacter = async () => {
    try {
      const result = await CharacterDatabase.connection.select('id','name','species','image').table("characters");
      return result;

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
