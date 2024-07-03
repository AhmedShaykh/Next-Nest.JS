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
import { LoginSchema } from "@/lib/schemas";
import { login } from "@/actions/login";
import FormSuccess from "./FormSuccess";
import FormError from "./FormError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const LoginForm = () => {

    const [error, setError] = useState<string | undefined>("");

    const [success, setSuccess] = useState<string | undefined>("");

    const [isPending, startTransaction] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {

        setError("");
        setSuccess("");

        startTransaction(() => {
            login(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                })
        });

    };

    return (
        <CardWrapper
            headerLabel="Welcome Back"
            backButtonLabel="Don't Have An Account"
            backButtonHref="/auth/register"
            showSocial
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="ahmx@mail.com"
                                            disabled={isPending}
                                            type="email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="********"
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
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
};

export default LoginForm;