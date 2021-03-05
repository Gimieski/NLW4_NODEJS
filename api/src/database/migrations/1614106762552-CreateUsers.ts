import {MigrationInterface, QueryRunner, Table} from "typeorm";
// criamos uma tabea de usuario com id, nome, email e created_at. Migrations são criações de tabelas dos dados do banco com posibilidade de versionar

export class CreateUsers1614106762552 implements MigrationInterface {
// processo assincrono para não esperar para criar um novo usuario. Obs: Up cria e down exclui
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"users",
                columns:[{
                    name:"id",
                    type:"uuid",
                    isPrimary:true
                },
                {
                    name:"name",
                    type:"varchar",
                },
                {
                    name:"email",
                    type:"varchar"
                },
                {
                    name:"created_at",
                    type:"timestamp",
                    default:"now()",
                }
            ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
