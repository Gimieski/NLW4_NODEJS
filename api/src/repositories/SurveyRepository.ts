import { EntityRepository, Repository } from "typeorm";
import {Survey} from "../models/Survey";

@EntityRepository(Survey)
class SurveysRepositories extends Repository<Survey>{}
// o repositorio vai armazenar as entidades do SurveyUser par ao controller

export { SurveysRepositories };