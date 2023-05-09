import { AdminDatabase } from "../data/AdminDataBase"
import { InvalidData, Unauthorized } from "../error/customError";
import { AdmClearById, AdmClearTable } from "../model/adminTDO"

export class AdminBusiness {
    private adminDataBase = new AdminDatabase();

    public clearTable = async(input: AdmClearTable) => {
        const { table, admKey } = input;
        if (!table || !admKey) {
            throw new InvalidData();
        }

        if (process.env.ADMIN_KEY != admKey) {
            throw new Unauthorized();
        }

        await this.adminDataBase.clearTable(table);
    }

    public clearTableById = async (input: AdmClearById) => {
        const {id, table, admKey } = input;
        if (!id || !table || !admKey) {
            throw new InvalidData();
        }
        if (process.env.ADMIN_KEY !== admKey) {
            throw new Unauthorized();
        }

        await this.adminDataBase.clearTableById(id,table);
    }

}