import { Request, Response } from "express";
import { ApiBusiness } from "../business/ApiBusiness";
import { EditApiInputDTO, LoginInputDTO, ApiInputDTO } from "../model/Api";

export class ApiController {

  private ApiBusiness = new ApiBusiness()


  public singUp = async (req: Request, res: Response) => {
    try {
      const {email} = req.body;
      const input: LoginInputDTO = {
        email
      };
      const token = await this.ApiBusiness.login(input);

      res.status(200).send({ message: "Usuário logado!", token });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };






















  public sin = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const input: ApiInputDTO = {
        email: email
      };
      const token = await this.ApiBusiness.createApi(input);

      res.status(201).send({ message: "Usuário criado!", token });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };

  public editApi = async (req: Request, res: Response) => {
    try {

      const input: EditApiInputDTO = {
        name: req.body.name,
        nickname: req.body.nickname,
        id: req.params.id,
        token: req.headers.authorization as string
      };

      const ApiBusiness = new ApiBusiness()
      console.log(input)
      await ApiBusiness.editApi(input);

      res.status(201).send({ message: "Usuário alterado!" });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };






}
