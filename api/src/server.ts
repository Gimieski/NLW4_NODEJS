import{app} from "./app";
app.listen(3333,()=> console.log("Server is running"));

/* Antes o server fazia todos os tipos de coisas(rotas, executar os recursos...), mas podemos separar isso,
app.ts => Executa os recursos;
routes => cuida das rotas;

isso facilita até para os testes*/


