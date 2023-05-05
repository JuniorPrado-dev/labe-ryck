import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { SingUpInputDTO } from "../model/userDTO";

export class UserController {

  private userBusiness = new UserBusiness()

  public singUp = async (req: Request, res: Response) => {
    try {
      const {email,name,password} = req.body;
      const input: SingUpInputDTO = {
        name,
        email,
        password
      };
      
      await this.userBusiness.singUp(input);

      res.status(200).send({ message: "Usuario Criado com sucesso! Verifique seu email!"});
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
