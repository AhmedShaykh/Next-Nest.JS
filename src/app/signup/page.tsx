"use client";
import { useEffect } from "react";
import SignUp from "@/Components/SignUp";
import { useRouter } from "next/navigation";

const SignUpPage = () => {

    const router = useRouter();

    useEffect(() => {

        if (typeof window !== "undefined") {

            const token = localStorage.getItem("token");

            if (token) {

                router.push("/");

            }

        }

    }, [router]);

    return <SignUp />
};

export default SignUpPage;