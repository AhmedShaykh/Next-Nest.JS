"use client";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";
import { Button } from "@/Components/ui/button";
import { useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

const Social = () => {

    const searchParams = useSearchParams();

    const callBackUrl = searchParams.get("callBackUrl");

    const onClick = (provider: "google" | "github") => {

        signIn(provider, {

            callbackUrl: callBackUrl || DEFAULT_LOGIN_REDIRECT

        });

    };

    return (
        <div className="flex items-center w-full gap-x-2">
            <Button
                className="w-full"
                onClick={() => onClick("google")}
                variant="outline"
                size="lg"
            >
                <FcGoogle className="h-5 w-5" />
            </Button>

            <Button
                className="w-full"
                onClick={() => onClick("github")}
                variant="outline"
                size="lg"
            >
                <FaGithub className="h-5 w-5" />
            </Button>
        </div>
    )
};

export default Social;