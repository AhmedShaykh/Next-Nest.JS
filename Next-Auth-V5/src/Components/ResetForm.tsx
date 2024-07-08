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
import { ResetSchema } from "@/lib/schemas";
import { reset } from "@/actions/reset";
import FormSuccess from "./FormSuccess";
import FormError from "./FormError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const ResetForm = () => {

    const [error, setError] = useState<string | undefined>("");

    const [success, setSuccess] = useState<string | undefined>("");

    const [isPending, startTransaction] = useTransition();

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: ""
        }
    });

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {

        setError("");
        setSuccess("");

        startTransaction(() => {
            reset(values)
                .then((data) => {
                    setError(data?.error);
                    setSuccess(data?.success);
                })
        });

    };

    return (
        <CardWrapper
            headerLabel="Forgot Your Password"
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
                        Send Reset Email
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
};

export default ResetForm;