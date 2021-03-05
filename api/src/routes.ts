import {Router} from "express";
import { UserController } from "./controllers/UserController";
import { SurveysController } from "./controllers/ServeysController";
import { SendMailController } from "./controllers/SendMailController";
import { AnswerController } from "./controllers/AnswerController";
// As orotas são as rotas para as requisições
const router=Router();

const userController=new UserController();
const surveysController=new SurveysController();
const sendMailController=new SendMailController();
const answerController=new AnswerController();
// controladas pelo controller
router.post("/users",userController.create);
// Post geralmente envia uma infromação mas nesse caso estamos criando(é.. estamos enviando)
router.post("/surveys",surveysController.create);
router.get("/surveys",surveysController.show);
// Procura todas as pesquisa e mostra

// aqui ele envia o email executando-o
router.post("/sendMail", sendMailController.execute);

router.get("/answers/:value",answerController.execute);
export {router};
//export eu to exportando paraque seja possivel usar isso em outra arquivo(exportando ele)