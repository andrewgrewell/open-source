import { SendMailOptions, Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export type MailTransporter = Transporter<SMTPTransport.SentMessageInfo>;

export type MailOptions = SendMailOptions;
