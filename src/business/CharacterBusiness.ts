import { CharacterDatabase } from "../data/CharacterDatabase";
import { CustomError, InvalidCharacterInfos, InvalidEmail, InvalidToken, UsedEmail } from "../error/customError";
import { CharacterCreateInputDTO, CharacterDTO, CharacterOutputDTO } from "../model/characterDTO";
import { IdGenerator } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";
import { getCharactersAPI } from "../services/apiChacters";


export class CharacterBusiness {

    private characterDatabase = new CharacterDatabase();

    public createCharacter = async (input: CharacterCreateInputDTO): Promise<void> => {
        try {
            console.log(input);

            const { name, species, token, image } = input;
            if (!name || !species || !token || !image) {
                throw new InvalidCharacterInfos;
            }
            //verilica se token válido
            const payload = TokenGenerator.tokenData(token);
            if (!payload) {
                throw new InvalidToken;
            }

            //add novo character
            const character: CharacterDTO = {
                id: IdGenerator.generateId(),
                name,
                species,
                image: image,
                id_user: payload.id
            }
            await this.characterDatabase.createCharacter(character)

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };
    //pega todos os personagens
    public getAllCharacter = async (): Promise<CharacterOutputDTO[]> => {
        try {
            //personagens da api do rick morty
            const charactersApi = await getCharactersAPI() as CharacterOutputDTO[];
            //personagens do banco de dados
            const allCharactersDB = await this.characterDatabase.getAllCharacter()
            //todos os personagens
            const allCharacters = [...allCharactersDB,...charactersApi]
            
            return allCharacters;
        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };
}
