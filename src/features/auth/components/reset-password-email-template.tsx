



// export default function ResetPasswordEmailTemplate(){

//     return(
//         <>
//         <p>Reset Password Email Password</p>
//         </>
//     )
// }


// Get the full source code, including the theme and Tailwind config:
// https://github.com/resend/react-email/tree/canary/apps/demo/emails

import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from 'react-email';
// import tailwindConfig from '../../tailwind.config';

interface ResetPasswordEmailTemplateProps {
  userFirstname?: string;
  resetPasswordLink?: string;
}



export const ResetPasswordEmailTemplate = ({
  resetPasswordLink,
}: ResetPasswordEmailTemplateProps) => {
  return (
    <Html>
      <Head />
     
        <Body className="bg-[#f6f9fc] py-2.5">
          <Preview>Dropbox reset your password</Preview>
          <Container className="bg-white border border-solid border-[#f0f0f0] p-[45px]">
            <Section>
              <Text className="text-base font-dropbox font-light text-[#404040] leading-[26px]">
                Hi User,
              </Text>
              <Text className="text-base font-dropbox font-light text-[#404040] leading-[26px]">
                Someone recently requested a password change for your Dropbox
                account. If this was you, you can set a new password here:
              </Text>
              <Button
                className="bg-[#007ee6] rounded text-white text-[15px] no-underline text-center font-dropbox-sans block w-[210px] py-[14px] px-[7px]"
                href={resetPasswordLink}
              >
                Reset password
              </Button>
              <Text className="text-base font-dropbox font-light text-[#404040] leading-[26px]">
                If you don&apos;t want to change your password or didn&apos;t
                request this, just ignore and delete this message.
              </Text>
              <Text className="text-base font-dropbox font-light text-[#404040] leading-[26px]">
                To keep your account secure, please don&apos;t forward this
                email to anyone. See our Help Center for{' '}
                <Link className="underline" href={resetPasswordLink}>
                  more security tips.
                </Link>
              </Text>
              <Text className="text-base font-dropbox font-light text-[#404040] leading-[26px]">
                Happy Coding!
              </Text>
            </Section>
          </Container>
        </Body>
      
    </Html>
  );
};

ResetPasswordEmailTemplate.PreviewProps = {
  userFirstname: 'Alan',
  resetPasswordLink: 'https://www.dropbox.com',
} as ResetPasswordEmailTemplateProps;



export default ResetPasswordEmailTemplate;
