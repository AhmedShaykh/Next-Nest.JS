import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <nav className="bg-red-600 text-white">
                Auth Nav
            </nav>

            {children}
        </div>
    )
};

export default AuthLayout;