"use client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import UserInfo from "@/Components/UserInfo";

const ClientPage = () => {

    const user = useCurrentUser();

    return (
        <UserInfo
            label="📱 Client Component"
            user={user}
        />
    )
};

export default ClientPage;