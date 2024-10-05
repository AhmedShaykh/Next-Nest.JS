"use client";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WithAuth({ children }: { children: ReactNode }) {

    return (
        <Auth>
            {children}
        </Auth>
    )

};

const Auth = ({ children }: { children: ReactNode }) => {

    const router = useRouter();

    useEffect(() => {

        if (typeof window !== "undefined") {

            const token = localStorage.getItem("token");

            if (token) {

                router.push("/", { scroll: false });

            } else {

                router.push("/login", { scroll: false });

            }

        }

    }, [router]);

    return (
        <>
            {children}
        </>
    )

};