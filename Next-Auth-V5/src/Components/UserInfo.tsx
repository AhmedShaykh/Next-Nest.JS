import { FC } from "react";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { ExtendedUser } from "../../next-auth";

interface UserInfoProps {
    user?: ExtendedUser;
    label: string;
};

const UserInfo: FC<UserInfoProps> = ({ user, label }) => {
    return (
        <Card className="w-[600px] shadow-md">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    {label}
                </p>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="flex flex-row items-center justify-between rounded-lg p-3 border-2">
                    <p className="text-sm font-medium">
                        ID
                    </p>

                    <p className="truncate text-sm max-w-[180px] font-mono p-1 bg-slate-900 rounded-md">
                        {user?.id}
                    </p>
                </div>

                <div className="flex flex-row items-center justify-between rounded-lg p-3 border-2">
                    <p className="text-sm font-medium">
                        Name
                    </p>

                    <p className="truncate text-sm max-w-[180px] font-mono p-1 bg-slate-900 rounded-md">
                        {user?.name}
                    </p>
                </div>

                <div className="flex flex-row items-center justify-between rounded-lg p-3 border-2">
                    <p className="text-sm font-medium">
                        Email
                    </p>

                    <p className="truncate text-sm max-w-[180px] font-mono p-1 bg-slate-900 rounded-md">
                        {user?.email}
                    </p>
                </div>

                <div className="flex flex-row items-center justify-between rounded-lg p-3 border-2">
                    <p className="text-sm font-medium">
                        Role
                    </p>

                    <p className="truncate text-sm max-w-[180px] font-mono p-1 bg-slate-900 rounded-md">
                        {user?.role}
                    </p>
                </div>

                <div className="flex flex-row items-center justify-between rounded-lg p-3 border-2">
                    <p className="text-sm font-medium">
                        Two Factor Authentication
                    </p>

                    <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
                        {user?.isTwoFactorEnabled ? "ON" : "OFF"}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    )
};

export default UserInfo;