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
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import * as z from "zod";

const LoginForm = () => {

    const [showTwoFactor, setShowTwoFactor] = useState(false);

    const [error, setError] = useState<string | undefined>("");

    const [success, setSuccess] = useState<string | undefined>("");

    const [isPending, startTransaction] = useTransition();

    const searchParams = useSearchParams();

    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
        ? "Email Already In Use With Different Provider!"
        : "";

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
                    if (data?.error) {
                        form.reset();
                        setError(data?.error);
                    }

                    if (data?.success) {
                        form.reset();
                        setSuccess(data?.success);
                    }

                    if (data?.twoFactor) {
                        setShowTwoFactor(true);
                    }
                })
                .catch(() => setError("Something Went Wrong!"));
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
                        {showTwoFactor && (
                            <FormField
                                control={form.control}
                                name="code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Code</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="123456"
                                                disabled={isPending}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        {!showTwoFactor && (
                            <>
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

                                            <Button
                                                className="px-0 font-normal"
                                                variant="link"
                                                size="sm"
                                                asChild
                                            >
                                                <Link href={"/auth/reset"}>
                                                    Forgot Password?
                                                </Link>
                                            </Button>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                    </div>

                    <FormError
                        message={error || urlError}
                    />

                    <FormSuccess
                        message={success}
                    />

                    <Button
                        className="w-full font-semibold"
                        type="submit"
                    >
                        {showTwoFactor ? "Confirm" : "Login"}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
};

export default LoginForm;