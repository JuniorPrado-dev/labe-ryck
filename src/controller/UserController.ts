import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { LoginInputDTO, SingUpInputDTO, UserOutputDTO } from "../model/userDTO";

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
  //login
  public login = async (req: Request, res: Response) => {
    try {
      const {email,password} = req.body;
      const input: LoginInputDTO = {
        email,
        password
      };
      
     const token= await this.userBusiness.login(input);

      res.status(200).send({ message: "Logado com sucesso!",token});
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };
  //get client
  public getUser = async (req: Request, res: Response) => {
    try {
      const { name, species, image } = req.body;
      const token = req.headers.authorization as string;
      const user:UserOutputDTO=await this.userBusiness.getUser(token);
      res.status(200).send(user);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }

}
