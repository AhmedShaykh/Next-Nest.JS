"use server";
import { generateVerificationToken } from "@/data/token";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";
import { sendVerificationEmail } from "@/lib/mail";
import { getUserByEmail } from "@/data/user";
import { LoginSchema } from "@/lib/schemas";
import { signIn } from "@/lib/auth";
import * as z from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {

    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {

        return { error: "Invalid Fields!" };

    }

    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {

        return { error: "Email Does Not Exist!" };

    }

    if (!existingUser.emailVerified) {

        const verificationToken = await generateVerificationToken(existingUser.email);

        await sendVerificationEmail(
            existingUser.email,
            verificationToken.token
        );

        return { success: "Confirmation Email Sent!" };
    }

    try {

        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        });

    } catch (error) {

        return { error: "Invalid Credentials!" };

    }

};