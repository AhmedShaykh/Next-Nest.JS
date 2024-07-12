import { ReactNode } from "react";
import Navbar from "@/Components/Navbar";

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="h-screen pb-[54rem] bg-gradient">
            <div className="flex flex-col items-center gap-y-10 justify-center">
                <Navbar />

                {children}
            </div>
        </div>
    )
};

export default ProtectedLayout;