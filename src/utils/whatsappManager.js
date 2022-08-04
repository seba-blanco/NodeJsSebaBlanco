const twilio = require('twilio');
const { WHATSFROM, TWILIOACCOUNT_SID, TWILIOAUTH_TOKEN } = require('../config/global')

const ACCOUNT_SID = TWILIOACCOUNT_SID;
const AUTH_TOKEN = TWILIOAUTH_TOKEN


const client = twilio(ACCOUNT_SID, AUTH_TOKEN);



async function send(celTo, body) {
    try {
        const message = await client.messages.create({
            body: body,
            from: 'whatsapp:+' + WHATSFROM,       
             to: 'whatsapp:'+ celTo 
        });

        console.log(message);
    } catch (error) {
        console.log(error);
    }
    
}

async function sendWhatsapp(prods, user) {
    try {
        let body=`nuevo pedido de: ${user.username}`;
        
        let data = prods.map((elem, index) => {
            return (`
                    producto: ${elem.name}`)
        });

        body = body + data;
        console.log(body);
        console.log(user);
        await send(user.cellphone, body);

        
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = {sendWhatsapp}