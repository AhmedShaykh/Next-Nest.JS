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
import { RegisterSchema } from "@/lib/schemas";
import { register } from "@/actions/register";
import FormSuccess from "./FormSuccess";
import FormError from "./FormError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const RegisterForm = () => {

    const [error, setError] = useState<string | undefined>("");

    const [success, setSuccess] = useState<string | undefined>("");

    const [isPending, startTransaction] = useTransition();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: ""
        }
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {

        setError("");
        setSuccess("");

        startTransaction(() => {
            register(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                })
        });

    };

    return (
        <CardWrapper
            headerLabel="Create An Account"
            backButtonLabel="Already Have An Account"
            backButtonHref="/auth/login"
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
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Ahmed Saleem"
                                            disabled={isPending}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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
                        Create Account
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
};

export default RegisterForm;