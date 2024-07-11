"use client";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import FormSuccess from "@/Components/FormSuccess";
import { Button } from "@/Components/ui/button";
import RoleGate from "@/Components/RoleGate";
import { admin } from "@/actions/admin";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

const AdminPage = () => {

    const onApiRouteClick = () => {
        fetch("/api/admin")
            .then((response) => {
                if (response.ok) {
                    toast.success("Allowed API Route!");
                } else {
                    toast.error("Forbidden API Route!");
                }
            })
    };

    const onServerActionClick = () => {
        admin()
            .then((data) => {
                if (data.error) {
                    toast.error(data.error);
                }
                if (data.success) {
                    toast.success(data.success);
                }
            })
    };

    return (
        <Card className="w-[600px] shadow-md">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    🔑 Admin
                </p>
            </CardHeader>

            <CardContent className="space-y-4">
                <RoleGate allowedRole={UserRole.ADMIN}>
                    <FormSuccess message="You Are Allowed To See This Content!" />
                </RoleGate>

                <div className="flex flex-row items-center justify-between rounded-lg p-3 border-2">
                    <p className="text-sm font-medium">
                        Admin-Only API Route
                    </p>

                    <Button
                        onClick={onApiRouteClick}
                        className="font-semibold"
                    >
                        Click To Test
                    </Button>
                </div>

                <div className="flex flex-row items-center justify-between rounded-lg p-3 border-2">
                    <p className="text-sm font-medium">
                        Admin-Only Server Action
                    </p>

                    <Button
                        onClick={onServerActionClick}
                        className="font-semibold"
                    >
                        Click To Test
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
};

export default AdminPage;