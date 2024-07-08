"use server";
import { generatePasswordResetToken } from "@/data/token";
import { sendPasswordResetEmail } from "@/lib/mail";
import { getUserByEmail } from "@/data/user";
import { ResetSchema } from "@/lib/schemas";
import * as z from "zod";

export const reset = async (values: z.infer<typeof ResetSchema>) => {

    const validatedFields = ResetSchema.safeParse(values);

    if (!validatedFields.success) {

        return { error: "Invalid Email!" };

    }

    const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {

        return { error: "Email Not Found!" };

    }

    const passwordResetToken = await generatePasswordResetToken(email);

    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token
    );

    return { success: "Reset Email Sent!" };

};