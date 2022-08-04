const twilio = require('twilio');
const { WHATSFROM } = require('../config/global')

const ACCOUNT_SID = 'AC02519b1c86db16835cd4dfb299c085f1';
const AUTH_TOKEN = '6cae0620315d238ba947fd0c54616def'


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