import nodemailer from "nodemailer"
import dotenv from 'dotenv'

dotenv.config();

export const emailServer = async (email:string,name:string,password:string) => {
    try {
        const auth= {
            user: `${process.env.USER}`,
            pass: `${process.env.PASS}`
        }
        console.log({auth});
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: `${process.env.USER}`,
                pass: `${process.env.PASS}`
            }
            
        });

        const mailOptions = {
            from: 'laberick.token@gmail.com',
            to: `${email}`,
            subject: `Cadastro LabeRick!`,
            html: `
            <h1>Olá ${name}, seja bem vinde ao nsso planeta!</h1>
            <img style="width:60vw;" src="https://imagenes.elpais.com/resizer/PW7xvk0fMpr0nAZyQ_j9_PkUSsM=/1200x0/filters:focal(683x211:693x221)/cloudfront-eu-central-1.images.arcpublishing.com/prisa/Z6WN33YVLRCTPCATP7EAJ2ODLE.jpg" alt="Rick e Morty">
            <h2>Você recebeu uma senha secreta de Rick!</h2>
            <p> <b>Não perca essa senha!</b> Se não, confundirão você com um inimigo! </p>
            <p>--------------------------</p>
            <h2>Senha:</h2>
            <h3>${password}</h3>
        `
        };
        //VERIFICA serviço de EMAIL
        await transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
            }
        });
        return await transporter.sendMail(mailOptions);

    } catch (err: any) {
        console.log(err.message);
        throw new Error("Erro de servidor de email")
    }

}