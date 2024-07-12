"use server";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { generateVerificationToken, generateTwoFactorToken } from "@/data/token";
import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/mail";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";
import { getUserByEmail } from "@/data/user";
import { LoginSchema } from "@/lib/schemas";
import { signIn } from "@/lib/auth";
import { db } from "@/lib/db";
import * as z from "zod";

export const login = async (
    values: z.infer<typeof LoginSchema>,
    callBackUrl?: string | null
) => {

    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {

        return { error: "Invalid Fields!" };

    }

    const { email, password, code } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {

        return { error: "Email Does Not Exist!" };

    }

    if (!existingUser.emailVerified) {

        const verificationToken = await generateVerificationToken(existingUser.email);

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        );

        return { success: "Confirmation Email Sent!" };

    }

    if (existingUser.isTwoFactorEnabled && existingUser.email) {

        if (code) {

            const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

            if (!twoFactorToken) {

                return { error: "Invalid Code!" };

            }

            if (twoFactorToken.token !== code) {

                return { error: "Invalid Code!" };

            }

            const hasExpired = new Date(twoFactorToken.expires) < new Date();

            if (hasExpired) {

                return { error: "Code Expired!" };

            }

            await db.twoFactorToken.delete({
                where: {
                    id: twoFactorToken.id
                }
            });

            const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

            if (existingConfirmation) {

                await db.twoFactorConfirmation.delete({
                    where: {
                        id: existingConfirmation.id
                    }
                });
            }

            await db.twoFactorConfirmation.create({
                data: {
                    userId: existingUser.id
                }
            });

        } else {

            const twoFactorToken = await generateTwoFactorToken(existingUser.email);

            await sendTwoFactorTokenEmail(
                twoFactorToken.email,
                twoFactorToken.token
            );

            return { twoFactor: true };

        }

    }

    try {

        await signIn("credentials", {
            email,
            password,
            redirectTo: callBackUrl || DEFAULT_LOGIN_REDIRECT
        });

    } catch (error) {

        return { error: "Invalid Credentials!" };

    }

};