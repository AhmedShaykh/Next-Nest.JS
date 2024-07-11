import { currentUser } from "@/data/current-user";
import UserInfo from "@/Components/UserInfo";

const ServerPage = async () => {

    const user = await currentUser();

    return (
        <UserInfo
            label="💻 Server Component"
            user={user}
        />
    )
};

export default ServerPage;