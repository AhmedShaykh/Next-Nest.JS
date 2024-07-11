"use client";
import { FC } from "react";
import { useCurrentRole } from "@/hooks/useCurrentRole";
import FormError from "@/Components/FormError";
import { UserRole } from "@prisma/client";

interface RoleGateProps {
    children: React.ReactNode;
    allowedRole: UserRole;
};

const RoleGate: FC<RoleGateProps> = ({ children, allowedRole }) => {

    const role = useCurrentRole();

    if (role !== allowedRole) {
        return (
            <FormError message="You Do Not Have Permission To View This Content!" />
        )
    }

    return (
        <>
            {children}
        </>
    )
};

export default RoleGate;