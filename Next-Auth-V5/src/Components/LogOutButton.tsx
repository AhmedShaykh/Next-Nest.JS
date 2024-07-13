"use client";
import { FC } from "react";
import { logOut } from "@/actions/logout";

interface LogOutButtonProps {
    children?: React.ReactNode;
};

const LogOutButton: FC<LogOutButtonProps> = ({ children }) => {

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