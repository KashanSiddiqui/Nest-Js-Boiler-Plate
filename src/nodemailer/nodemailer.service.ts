import { Injectable, NotFoundException } from '@nestjs/common';

const nodemailer = require('nodemailer');
// const mailSend = require('./node');


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    port: 587,
    secure: false,
    auth: {
        user: process.env.user, // generated ethereal user
        pass: process.env.secret// generated ethereal password
    },
    tls: {
        rejectUnauthorized: false
    }
});
@Injectable()
export class NodemailerService {
    // products: Product[] = [];

    constructor(){}
    
    sendInvoiceEmail = async () => {
        try {
            
            let info = await transporter.sendMail({
                from: 'Crypto Farm', // sender address
                to:"" ,//receiver email
                subject: 'Invoice of Payment', // Subject line
                html: '<h1>Welcome</h1><p>That was easy!</p>'
            })
            const mail = {
                info: info,
                
            };
            console.log("message checked=>", mail);
            return mail;
        }
        catch (e) {
            // console.log("catching error in mail==>", e);
            throw [404, "Email not send"];
        }
    }
    
    
    
    
    mailToCustomMail = async () => {
        try {
            
            await this.sendInvoiceEmail();
            return true;
        }
        catch (e) {
            throw [404, "Email not Send"];
        }
    }

}