import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSurveyUsers1614782137771 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"surveys_users",
                columns:[
                {
                    name:"id",
                    type:"uuid",
                    isPrimary:true
                },
                {
                    name:"user_id",
                    type:"uuid",
                //Na criação do user, esta id, então colocamos id
                },
                {
                    name:"survey_id",
                    type:"uuid"
                },
                {
                    name:"value",
                    type:"number",
                /* quando eniarmos o email, vai criar um dado na 
                tabela(pois vai criar um id do usuario e da pesquisa) 
                mas nesse momento do "value" não temos esses dados, então 
                quando o dado for salvo, inicialmente ele vai vir nulo. 
                Entaão temos que permitir que a tabela seja nula 
                */
                    isNullable:true
                //Quando tiver alguma mudança constante na tabela, devemos deixar o valor padroa nulo
                },
                {
                    name:"created_at",
                    type:"timestamp",
                    default:"now()"
                    // now() é a hora do servidro
                }
                ],
                foreignKeys:[
                    {
                        name:"FKUser",
                        referencedTableName:"users",
                        referencedColumnNames:["id"],
                        columnNames:["user_id"],
                    //Colocamos que a tabela de referencia para nossa, a q queremos referenciar é o id e oq vai ser usado é no user_id. Entaão sempre vamos saber que o user_id é o id de usuario 
                        onDelete:"CASCADE",
                        onUpdate:"CASCADE"
                    //CASCADE atualiza a ligação das tabelas. No caso de ser Deletada e atualizada ali 
                    },
                    {
                        name:"FKSurvey",
                        referencedTableName:"surveys",
                    //Pegamos o survey como referencia, o id dele e ele vai influenciar na tabela 
                        referencedColumnNames:["id"],
                        columnNames:["survey_id"],
                        onDelete:"CASCADE",
                        onUpdate:"CASCADE"
                    //CASCADE atualiza a ligação das tabelas. No caso de ser Deletada e atualizada ali 
                    }
                ]
            /*Isso é o conceito de "chave Estrangeira" sempre quando 
            relacioamos tabelas, temos que ter chaves estrangeiras, para interliga-las. Aqui
             estamos relacionando a Criação de usuario para mapear o id e tal, e colocarno users_id
            */
                })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("surveys_users");
    }

}
