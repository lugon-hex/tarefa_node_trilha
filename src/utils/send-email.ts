import { env } from '@env/index.js'
import type { SendMailOptions, SentMessageInfo } from 'nodemailer'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_SECURE,
  auth: {
    user: env.SMTP_EMAIL.trim(),
    pass: env.SMTP_PASSWORD.replace(/\s+/g, ''),
  },
})

interface SendEmailRequest {
  to: string
  subject: string
  message: string
  html: string
  attachments?: SendMailOptions['attachments']
}

export async function sendEmail({
  to,
  subject,
  message,
  html,
  attachments,
}: SendEmailRequest): Promise<SentMessageInfo> {
  const info = await transporter.sendMail({
    from: env.SMTP_EMAIL,
    to,
    subject,
    text: message,
    html,
    ...(attachments ? { attachments } : {}),
  })

  return info
}
