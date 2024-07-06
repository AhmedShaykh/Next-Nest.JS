"use server";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";

export const newVerification = async (token: string) => {

    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {

        return { error: "Token Does Not Exist!" };

    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {

        return { error: "Token Has Expired!" };

    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {

        return { error: "Email Does Not Exist!" };

    }

    await db.user.update({
        where: {
            id: existingUser.id
        },
        data: {
            emailVerified: new Date(),
            email: existingToken.email
        }
    });

    await db.verificationToken.delete({
        where: {
            id: existingToken.id
        }
    });

    return { success: "Email Verified!" };

};