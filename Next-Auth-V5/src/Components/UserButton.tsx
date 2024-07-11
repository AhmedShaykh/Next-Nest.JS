"use client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import LogOutButton from "@/Components/LogOutButton";
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/Components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/Components/ui/dropdown-menu";
import { ExitIcon } from "@radix-ui/react-icons";
import { FaUser } from "react-icons/fa";

const UserButton = () => {

    const user = useCurrentUser();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image || ""} />

                    <AvatarFallback className="bg-black">
                        <FaUser />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="w-40"
                align="end"
            >
                <LogOutButton>
                    <DropdownMenuItem className="cursor-pointer">
                        <ExitIcon className="h-4 w-4 mr-2" />

                        Log Out
                    </DropdownMenuItem>
                </LogOutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    )
};

export default UserButton;