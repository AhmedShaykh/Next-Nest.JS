"use client";
import { useState, useTransition } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import CardWrapper from "./CardWrapper";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/Components/ui/form";
import { newPassword } from "@/actions/new-password";
import { NewPasswordSchema } from "@/lib/schemas";
import FormSuccess from "./FormSuccess";
import FormError from "./FormError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { getCsrfToken } from "next-auth/react";

const NewPasswordForm = () => {

    const [error, setError] = useState<string | undefined>("");

    const [success, setSuccess] = useState<string | undefined>("");

    const [isPending, startTransaction] = useTransition();

    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: ""
        }
    });

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {

        setError("");
        setSuccess("");

        startTransaction(() => {
            newPassword(values, token)
                .then((data) => {
                    setError(data?.error);
                    setSuccess(data?.success);
                })
        });

    };

    return (
        <CardWrapper
            headerLabel="Enter A New Password"
            backButtonLabel="Back To Login"
            backButtonHref="/auth/login"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="******"
                                            disabled={isPending}
                                            type="password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormError
                        message={error}
                    />

                    <FormSuccess
                        message={success}
                    />

                    <Button
                        className="w-full font-semibold"
                        type="submit"
                    >
                        Reset Password
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
};

export default NewPasswordForm;