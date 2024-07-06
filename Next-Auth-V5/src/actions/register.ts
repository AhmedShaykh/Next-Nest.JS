"use server";
import { generateVerificationToken } from "@/data/token";
import { sendVerificationEmail } from "@/lib/mail";
import { RegisterSchema } from "@/lib/schemas";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import * as z from "zod";

export const register = async (values: z.infer<typeof RegisterSchema>) => {

    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid Fields!" };

    const { name, email, password } = validatedFields.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) return { error: "Email Already Is Use!" };

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
    );

    return { success: "Confirmation Email Sent!" };

};