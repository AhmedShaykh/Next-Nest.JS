import { ReactNode } from "react";
import Navbar from "@/Components/Navbar";

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex h-full w-full flex-col items-center gap-y-10 justify-center bg-gradient">
            <Navbar />

            {children}
        </div>
    )
};

export default ProtectedLayout;