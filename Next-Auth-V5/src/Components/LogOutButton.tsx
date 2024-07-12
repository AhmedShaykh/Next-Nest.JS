"use client";
import { FC, useEffect } from "react";
import { logOut } from "@/actions/logout";
import { useRouter } from "next/navigation";

interface LogOutButtonProps {
    children?: React.ReactNode;
};

const LogOutButton: FC<LogOutButtonProps> = ({ children }) => {

    const router = useRouter();

    useEffect(() => {
        router.refresh();
    }, []);

    const onClick = () => {
        logOut();
    };

    return (
        <span
            className="cursor-pointer font-medium"
            onClick={onClick}
        >
            {children}
        </span>
    )
};

export default LogOutButton;