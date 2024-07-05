"use client";
import { useEffect } from "react";
import Login from "@/Components/Login";
import { useRouter } from "next/navigation";

const LoginPage = () => {

    const router = useRouter();

    useEffect(() => {

        if (typeof window !== "undefined") {

            const token = localStorage.getItem("token");

            if (token) router.push("/");

        }

    }, [router]);

    return <Login />

};

export default LoginPage;