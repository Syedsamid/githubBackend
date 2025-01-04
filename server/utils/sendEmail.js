import nodemailer from "nodemailer";
import config from "config"

let USER = config.get("USER");
let PASS = config.get("PASS");

async function sendEmail(emailData){
    try {
        let mail = nodemailer.createTransport({
            host:"smtp.gmail.com",
            port:465,
            secure: true,
            auth:{
                user: USER,
                pass: PASS
            }
        })
        let sendmail = await mail.sendMail({
            from: `From ${USER}`,
            to: emailData.to,
            subject: emailData.subject,
            html:emailData.html
        })
        console.log("Email send to user");
        console.log(sendmail.messageId);

    } catch(error){
        console.log(error);
    }
}
export default sendEmail