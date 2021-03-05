import { Column, CreateDateColumn, Entity, PrimaryColumn } from"typeorm";
import {v4 as uuid} from "uuid" 
@Entity("users")
class User{
//"Models" são onde ficam as entidades. E entidades são os dados de uma tabela.
    @PrimaryColumn()
    readonly id:string;
// id que vai ser aleatorio
    @Column()
    name:string;
// nome string
    @Column()
    email:string;
// etc...
    @CreateDateColumn()
    created_at:Date;

    constructor(){
        if(!this.id){
            this.id=uuid()
        }
    }
}


export { User }
// exportamos para usar o Repositories