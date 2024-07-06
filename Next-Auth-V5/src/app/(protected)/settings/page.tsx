import { Button } from "@/Components/ui/button";
import { auth, signOut } from "@/lib/auth";
import React from "react";

const SettingsPage = async () => {

    const session = await auth();

    return (
        <div>
            {JSON.stringify(session)}

            <form action={async () => {
                "use server";
                await signOut();
            }}>
                <Button type="submit">
                    Sign Out
                </Button>
            </form>
        </div>
    )
};

export default SettingsPage;