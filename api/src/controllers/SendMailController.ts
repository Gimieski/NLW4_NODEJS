// Envia um email pelas rotas
import{ Request, Response} from "express";
import { usersRepositories } from "../repositories/UserRepositories";
import {getCustomRepository} from "typeorm";
import { SurveysRepositories } from "../repositories/SurveyRepository";
import { SurveyUserRepository } from "../repositories/SurveyUserRepository";
import SendMailServices from "../services/SendMailServices";
import {resolve} from "path";

class SendMailController{

    async execute(request:Request, response:Response){
        const {email,survey_id}=request.body;

    //Colocou os repositorios em uma variavel 
        const usersRepository=getCustomRepository(usersRepositories);
        const surveysRepository=getCustomRepository(SurveysRepositories);
        const surveysUserRepository=getCustomRepository(SurveyUserRepository);

    //Cria uma variavel que armazena o encontro do email continuo de um usuario 
        const userAlredyExists= await usersRepository.findOne({
            email
        });
    //Verifica se existe depois de encontrar 
        if(!userAlredyExists){
           return response.status(400).json({
               error:"User dows not exists"
            })  
        }

        const surveysAlredyExist=await surveysRepository.findOne({
            id:survey_id
            // nos colocamos nas tabelas que id é igual a surveys_id, e para ele reconhecer, devemos fazer isso
        })

        if(!surveysAlredyExist){
            return response.status(400).json({
               error:"Survey dows not exists"
            })
        }
        
        const npsPath = resolve(__dirname, "..", "views", "email", "npsMail.hbs");
       
       const surveyUserAlredyExist=await surveysUserRepository.findOne({
            where:{user_id:userAlredyExists.id,value:null},
            relations: ["user", "survey"]
        //  aqui esta vindo o id e verificando se é nulo
        })
        const variables={
           name:userAlredyExists.name,
           title:surveysAlredyExist.title,
           description:surveysAlredyExist.description,
           id:"",
           link:process.env.URL_MAIL,
        }
        // deixamos o id vazio para ir gerando dinamicamente

        // se a pesquisa ja existir vai atribuir o id ja
        if(surveyUserAlredyExist){
            variables.id=surveyUserAlredyExist.id;
            await SendMailServices.execute(email,surveysAlredyExist.title,variables,npsPath);
            return response.json(surveyUserAlredyExist);
        }
        
        //Cria uma instancia do bagulho
        const surveyUser=surveysUserRepository.create({
            user_id:userAlredyExists.id,
            survey_id
        })
        // salva
        await surveysUserRepository.save(surveyUser);

       
        variables.id=surveyUserAlredyExist.id;
      
       // enviar o sdrviço de email, que foi criado
        await SendMailServices.execute(email,surveysAlredyExist.title,variables,npsPath);

        return response.json(surveyUser);

    }
}

export{SendMailController}