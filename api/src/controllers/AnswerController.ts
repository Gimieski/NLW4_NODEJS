//http://localhost:3333/answers/10?u=2b9ee985-1639-4da8-802f-5bc46fba509b
/*
Route params => Parametros que comporme a rota.Qaundo temos isso, ele faz parte da rota.
routes.get(/answers/:value) sempre quando temos um ROute params esta é a estrutura

query params => Parametros não obrigatorios para busca, paginação... 
Ele sempre vem depois do ponto de interrogação
*/

import { getCustomRepository } from "typeorm";
import { SurveyUserRepository } from "../repositories/SurveyUserRepository";
import{ Request, Response} from "express";

class AnswerController{
    async execute(request:Request, response:Response){
        const{value}=request.params;
        const{u}=request.query;

        const SurveysUserRepository=getCustomRepository(SurveyUserRepository);

        const surveysUser=await SurveysUserRepository.findOne({
            id:String(u)
        });

        if(!surveysUser){
            return response.status(400).json({
                error:"Survey User dows not exists!",
            })
        }
        surveysUser.value=Number(value);

        await SurveysUserRepository.save(surveysUser);

        return response.json(surveysUser)
    }
}

export{AnswerController}