import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex h-full flex-col items-center justify-center bg-gradient">
            {children}
        </div>
    )
};

export default AuthLayout;