"use client";
import UserButton from "@/Components/UserButton";
import { Button } from "@/Components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {

    const pathname = usePathname();

    return (
        <div
            className="bg-black flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm mt-12"
        >
            <div className="flex gap-x-2">
                <Button
                    variant={pathname === "/server" ? "default" : "outline"}
                    className="font-semibold"
                    asChild
                >
                    <Link href={"/server"}>
                        Server
                    </Link>
                </Button>

                <Button
                    variant={pathname === "/client" ? "default" : "outline"}
                    className="font-semibold"
                    asChild
                >
                    <Link href={"/client"}>
                        Client
                    </Link>
                </Button>

                <Button
                    variant={pathname === "/admin" ? "default" : "outline"}
                    className="font-semibold"
                    asChild
                >
                    <Link href={"/admin"}>
                        Admin
                    </Link>
                </Button>

                <Button
                    variant={pathname === "/settings" ? "default" : "outline"}
                    className="font-semibold"
                    asChild
                >
                    <Link href={"/settings"}>
                        Settings
                    </Link>
                </Button>
            </div>

            <UserButton />
        </div>
    )
};

export default Navbar;