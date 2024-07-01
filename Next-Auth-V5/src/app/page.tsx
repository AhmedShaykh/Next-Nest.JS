import { LoginButton } from "@/Components/auth/login-button";
import { Button } from "@/Components/ui/button";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"]
});

const Home = () => {
    return (
        <main className="flex h-full flex-col items-center justify-center bg-gradient">
            <div className="space-y-6 text-center">
                <h1 className={
                    cn("text-6xl font-semibold text-white drop-shadow-md",
                        font.className
                    )}>
                    🔐 Auth
                </h1>

                <p className="text-xl text-white font-medium">
                    Next Auth.JS Authenticaion
                </p>

                <div>
                    <LoginButton>
                        <Button size="lg" className="font-semibold">
                            Sign In
                        </Button>
                    </LoginButton>
                </div>
            </div>
        </main>
    )
};

export default Home;