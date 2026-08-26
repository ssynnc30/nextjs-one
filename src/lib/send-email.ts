import ResetPasswordEmailTemplate from '@/features/auth/components/reset-password-email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface sendEmailProps{
    to:string,
    subject:string,
    resetPasswordLink:string
}
export async function sendEmail({to,subject,resetPasswordLink}:sendEmailProps) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['delivered@resend.dev'],
      subject: 'Hello world',
      react: ResetPasswordEmailTemplate({resetPasswordLink}),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}