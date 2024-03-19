import { IEmail } from "./IEmail";

export interface SMTPOptionsProps {
  host: string;
  port: number;
  secure: boolean;
  auth: {
      user: string;
      pass: string;
  };
}

export interface IEmailProps {
  remetente: string;
  nomeRemetente: string;
}

export abstract class EmailPort {
  protected protocolo: 'IMAP' | 'SMTP';
  protected smtpOptions: SMTPOptionsProps;
  protected emailOptions: IEmailProps;

  abstract configure(): void;
  abstract sendEmail(email: IEmail): Promise<any>;
}