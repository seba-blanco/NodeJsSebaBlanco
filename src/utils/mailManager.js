const NM = require('nodemailer');
const { MAILADMIN, MAILFROM } = require('../config/global')
const log4ejs = require('log4js');


const transporter = NM.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'rahsaan.harris35@ethereal.email',
        pass: 'pWAAjyRmGtsmRZHKcJ'
    }
});

sendMail  = async (subject, emailTO, mailBody ) => {
    try {
        const mailOptions = {
            from: MAILFROM,
            to: emailTO,
            subject: subject,
            html: mailBody
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(info);
    }
    catch(err) {
        console.log(err);
    }
}
sendNewOperationMail = async (user, prods) => {
    
    let subject=`nuevo pedido de: ${user.username}`;
        
    let data = prods.map((elem, index) => {
        return (`<p><b>producto: ${elem.name}</b></p>`)
    });

    console.log(subject);
    console.log(data);


    await sendMail(subject, MAILADMIN, data.toString());
 
}
sendNewUserMail =async (newUser) => {
    let HTML = `Se registro un nuevo usuario: 
    <p><b>Username: ${newUser.username}</b></p> 
    <p><b>First Name: ${newUser.firstName} </b></p> 
    <p><b>Last Name: ${newUser.lastName} </b></p>
    <p><b>address: ${newUser.address}</b></p>
    <p><b>age: ${newUser.age} </b></p>
    <p><b>cellphone: ${newUser.cellphone} </b></p>
    <p><b>email: ${newUser.email}<</b></p>`;


    await sendMail('Nuevo Registro', MAILADMIN, HTML);
 
}

module.exports = {sendNewUserMail, sendNewOperationMail}