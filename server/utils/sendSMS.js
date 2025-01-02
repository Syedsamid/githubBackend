import twilio from "twilio";
import config from "config";

let sid = config.get("SID");
let token = config.get("TOKEN");
let phone = config.get("PHONE");

const client = new twilio(sid,token);

async function sendSMS(smsData){
    try {
        await client.messages.create({
            body: smsData.body,
            to: smsData.to,
            from: phone,
        });
        console.log("SMS is send to your number");
    } catch (error) {
        console.log(error);
    }
}
export default sendSMS;