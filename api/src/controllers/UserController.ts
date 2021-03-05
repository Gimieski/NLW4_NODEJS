import { Request, Response} from "express";
import {getCustomRepository} from "typeorm";
import {usersRepositories}  from "../repositories/UserRepositories";
class UserController{
    async create(request:Request, response:Response){
// como vamos receber os parametrso para o banco de dados?
          const {name,email}=request.body;
          
          const usersRepository=getCustomRepository(usersRepositories);
// Trazer email para o email, para não repetir o mesmo email
          const userAlredyExists=await usersRepository.findOne({
              email
          });

          if(userAlredyExists){
              return response.status(400).json({
                 error:"Este usuario ja existe!"  
              });
          }

          const user= usersRepository.create({
              name,
              email,
          })
          await usersRepository.save(user);
          return response.status(201).json(user);
    }
}

export {UserController};