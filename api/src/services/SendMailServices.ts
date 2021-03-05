import nodemailer, { Transporter } from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
// para mapearmos o caminho das variavies exportadas

// Bom, eu não entendi muiot bem o código em si, mas seguindo a documentação podemos fazer isso sem problemas.

// Cria a conta
class SendMailServices{
   private client:Transporter
// assim que uma classe é executada, oq esta dentro do contrutor é ativado
   constructor() {
       nodemailer.createTestAccount().then( account =>{
        const transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            }
        });

        this.client = transporter;
       })
    }
    // Executa uma mensagem com as especificações
   async execute(to:string,subject:string, variables:object, path:string){
     
      const templateFileContent = fs.readFileSync(path).toString("utf-8");

      const mailTemplateParse= handlebars.compile(templateFileContent);
      // vai retornar uma variavel
      const html=mailTemplateParse(variables)
      const message=await this.client.sendMail({
        to,
        subject,
        html,
        from:"NPS <noreplay@nps.com.br>"
      }) 
      console.log('Message sent: %s', message.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
   }
}

export default new SendMailServices();