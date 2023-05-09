import { Request, Response } from "express";
import { AdmClearById, AdmClearTable } from "../model/adminTDO";
import { AdminBusiness } from "../business/AdminBusiness";

export class AdminController {

    private adminBusiness = new AdminBusiness()
    //apagar tabela
    public clearTable = async (req: Request, res: Response) => {
        try {
            const { table, admKey } = req.body;
            const input: AdmClearTable = {
                table,
                admKey
            };

            await this.adminBusiness.clearTable(input);

            res.status(200).send({ message: `Tabela ${table} limpa com sucesso!` });
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    };
    //Apaga por registro
    public clearById = async (req: Request, res: Response) => {
        try {
            const { id, table, admKey } = req.body;
            const input: AdmClearById = {
                id,
                table,
                admKey
            };

            await this.adminBusiness.clearTableById(input);

            res.status(200).send("Registro apagado com sucesso");
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    };
}
