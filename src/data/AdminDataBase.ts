import { BaseDatabase } from "./BaseDatabase";

export class AdminDatabase extends BaseDatabase {
    public async clearTable(table:string){
      await AdminDatabase.connection(table).truncate()
        .then(() => {
          console.log(`Tabela ${table} limpa com sucesso!`);
        })
        .catch((err) => {
          console.error(err);
        })
    }  
    //apaga registro pelo id
    public async clearTableById(id:string,table:string){
      await AdminDatabase.connection(table).where('id', '=', id).del()
      .then(() => {
        console.log('Registro excluído com sucesso!');
      })
      .catch((err) => {
        console.error(err);
      })
    }  
  
}
