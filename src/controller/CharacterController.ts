import { Request, Response } from "express";
import { CharacterBusiness } from "../business/CharacterBusiness";
import { CharacterCreateInputDTO, CharacterOutputDTO } from "../model/characterDTO";

export class CharacterController {

  private characterBusiness = new CharacterBusiness()

  public createCharacter = async (req: Request, res: Response) => {
    try {
      const { name, species, image } = req.body;
      const token = req.headers.authorization as string;
      const input: CharacterCreateInputDTO = {
        name,
        species,
        token,
        image
      };

      await this.characterBusiness.createCharacter(input);

      res.status(200).send({ message: "Ser adicionado com sucesso!" });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }
  //pegar todos os personagens
  public getAllCharacter = async (req: Request, res: Response) => {
    try {
      

      const allChactrers:CharacterOutputDTO[]=await this.characterBusiness.getAllCharacter();

      res.status(200).send(allChactrers);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };






















  // public sin = async (req: Request, res: Response) => {
  //   try {
  //     const { email } = req.body;
  //     const input: ApiInputDTO = {
  //       email: email
  //     };
  //     const token = await this.ApiBusiness.createApi(input);

  //     res.status(201).send({ message: "Usuário criado!", token });
  //   } catch (error: any) {
  //     res.status(400).send(error.message);
  //   }
  // };

  // public editApi = async (req: Request, res: Response) => {
  //   try {

  //     const input: EditApiInputDTO = {
  //       name: req.body.name,
  //       nickname: req.body.nickname,
  //       id: req.params.id,
  //       token: req.headers.authorization as string
  //     };

  //     const ApiBusiness = new ApiBusiness()
  //     console.log(input)
  //     await ApiBusiness.editApi(input);

  //     res.status(201).send({ message: "Usuário alterado!" });
  //   } catch (error: any) {
  //     res.status(400).send(error.message);
  //   }
  // };
}
