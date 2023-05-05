import knex from 'knex'
import dotenv from 'dotenv'

dotenv.config()

export class BaseDatabase {
   protected static connection = knex({
      client: "sqlite3",
      connection: {
         filename: "./src/data/database.db", //localização do seu arquivo .db
      },
      useNullAsDefault: true, // definirá NULL quando encontrar valores undefined
   })

}

