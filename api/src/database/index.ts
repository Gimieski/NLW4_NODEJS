import {Connection, createConnection, getConnectionOptions} from 'typeorm';

export default async():Promise<Connection> =>{
// exporta uma class Connection que é uma promise, e tudo que é uma promise usa async ou await então estamos exportando algo que importamos
    const defaultOptions=await getConnectionOptions();
    return createConnection(
        Object.assign(defaultOptions,{
            database:process.env.NODE_ENV.trim() ==="test" 
            ? "./src/database/database.test.sqlite"
            :defaultOptions.database,
/*o object.assign permite alterar um valor de algo(que é 
o default ali,e as opções padroes do Typeorm)e altera algum
no caso o database. no caso estamos alterando de um banco test(variavel de abiente) ou o banco real

sempre quando estamos utilizando variave de ambiente, usamos 
process.env , para verificar se ela é teste ou n
verificando se o NODE_ENV é igual a test
*/
        })
    );
}

