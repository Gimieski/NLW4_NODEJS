import 'reflect-metadata';
// impportamos o reflectmetadata, que faz o server refletir no banco
import express, { request, response } from "express";
// importamos o express
import "./database/index.ts";
// a conexão com o banco
import createConnection from "./database";
import { router } from './routes';

createConnection();
const app= express();
// armazenamos ele em uma variavel

app.use(express.json())
app.use(router)
/*
GET => Faz uma busca 
Post =>Salvar/enviar uma informação
PUT => Alterar algo
DELETE => Deletar  algo
PATCH => Alterar algo bem especifico(imagem...)
*/

export{app};