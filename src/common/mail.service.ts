import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';

@Injectable()
export class MailService {
  smtpTransport: any;
  constructor() {
    this.smtpTransport = createTransport({
      host: process.env.smtp_host,
      port: process.env.smtp_port,
      secure: true,
      auth: {
        user: process.env.smtp_user,
        pass: process.env.smtp_password,
      },
    });
  }

  sendMail(text: string, to: string, subject: string, callback: any) {
    const mailOpts: MailOptions = {
      from: process.env.target_mail,
      to: to,
      subject: subject,
      text: text,
    };

    this.smtpTransport.sendMail(mailOpts, (error, response) => {
      callback(error, response);
    });
  }

  generateWelcomeMail(roomUUID: string, participateUUID: string) {
    return `
    Willkommen zur Tuckman Analyse. 
    Hier sind die wichtigsten Links für dich:

    Link für die Teilnehmer: https://tuckman.karmakurier.org/participate/${participateUUID}

    Link für die Auswertung: https://tuckman.karmakurier.org/results/${roomUUID}

    Viele Grüße,
    dein Karamkurier Team
    `;
  }
}
