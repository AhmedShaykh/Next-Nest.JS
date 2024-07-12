import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domian = process.env.NEXT_PUBLIC_APP_URL;

export const sendPasswordResetEmail = async (email: string, token: string) => {

    const resetLink = `${domian}/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Reset Your Password",
        html: `<p>Click <a href="${resetLink}">Here</a> To Reset Password</p>`
    });

};

export const sendVerificationEmail = async (email: string, token: string) => {

    const ConfirmLink = `${domian}/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Verify Your Email",
        html: `<p>Click <a href="${ConfirmLink}">Here</a> To Confirm Email</p>`
    });

};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "2FA Code",
        html: `<p>Your 2FA Code: ${token}</p>`
    });

};