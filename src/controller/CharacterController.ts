// import { Request, Response } from "express";
// import { CharacterBusiness } from "../business/CharacterBusiness";
// import { CharacterCreateInputDTO } from "../model/characterDTO";

// export class CharacterController {

//   private characterBusiness = new CharacterBusiness()

//   public insertCharacter = async (req: Request, res: Response) => {
//     try {
//       const { name,species,imageUrl} = req.body;
//       const token= req.headers.authorization as string;
//       const input:CharacterCreateInputDTO  = {
//         name,
//         species,
//         token,
//         imageUrl
//       };
      
//       await this.characterBusiness.insertCharacter(input);

//       res.status(200).send({ message: "Token Gerado! Verifique seu email!"});
//     } catch (error: any) {
//       res.status(400).send(error.message);
//     }
//   };






















//   // public sin = async (req: Request, res: Response) => {
//   //   try {
//   //     const { email } = req.body;
//   //     const input: ApiInputDTO = {
//   //       email: email
//   //     };
//   //     const token = await this.ApiBusiness.createApi(input);

//   //     res.status(201).send({ message: "Usuário criado!", token });
//   //   } catch (error: any) {
//   //     res.status(400).send(error.message);
//   //   }
//   // };

//   // public editApi = async (req: Request, res: Response) => {
//   //   try {

//   //     const input: EditApiInputDTO = {
//   //       name: req.body.name,
//   //       nickname: req.body.nickname,
//   //       id: req.params.id,
//   //       token: req.headers.authorization as string
//   //     };

//   //     const ApiBusiness = new ApiBusiness()
//   //     console.log(input)
//   //     await ApiBusiness.editApi(input);

//   //     res.status(201).send({ message: "Usuário alterado!" });
//   //   } catch (error: any) {
//   //     res.status(400).send(error.message);
//   //   }
//   // };
// }
