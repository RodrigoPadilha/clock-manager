import { IEmail } from "@/domain/email/IEmail";
import { Transporter, createTransport } from 'nodemailer';
import { EmailConfigMismatchException } from "@/infra/exceptions/emailconfigmismatch.exception";
import { SMTPOptionsProps, IEmailProps, EmailPort } from "@shared/ports/IEmail.port";

const TRANSPORT_PROPS: SMTPOptionsProps = {
  host: process.env.EMAIL_HOST as any,
  port: +(process.env.EMAIL_PORTA as any),
  secure: process.env.EMAIL_SECURE == 'true',
  auth: {
    user: process.env.EMAIL_LOGIN as any,
    pass: process.env.EMAIL_PASSWORD as any
  }
};

const EMAIL_OPTIONS: IEmailProps = {
  remetente: process.env.EMAIL_SENDER as any,
  nomeRemetente: process.env.EMAIL_SENDERNAME as any
};

export class NodemailerAdapter extends EmailPort {
  protected declare protocolo: 'IMAP' | 'SMTP';
  protected smtpOptions: SMTPOptionsProps = TRANSPORT_PROPS;
  protected emailOptions: IEmailProps = EMAIL_OPTIONS;
  protected transporter: Transporter;

  constructor() {
    super();
    this.protocolo = 'SMTP';
    this.configure();
  }

  configure() {
    if (this.protocolo == 'SMTP') {
      this.transporter = createTransport(this.smtpOptions);
    }
  }

  async sendEmail(email: IEmail): Promise<any> {
    try {
      if (!this.smtpOptions.host || !this.smtpOptions.auth.user) {
        throw new EmailConfigMismatchException();
      }
      const res = await this.transporter.sendMail({
        from: this.emailOptions.remetente,
        sender: this.emailOptions.nomeRemetente,
        to: email.recipients,
        text: email?.body,
        html: email?.body,
        subject: email.subject,
      });
      
      return res;
    } catch (error) {
      console.log(error);
    }
  }
}