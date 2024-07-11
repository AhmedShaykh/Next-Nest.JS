"use client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Button } from "@/Components/ui/button";
import { logOut } from "@/actions/logout";

const SettingsPage = () => {

    const user = useCurrentUser();

    const onClick = () => {
        logOut();
    };

    return (
        <div className="p-10 rounded-xl">
            <Button
                className="font-semibold"
                onClick={onClick}
                type="submit"
            >
                Sign Out
            </Button>
        </div>
    )
};

export default SettingsPage;