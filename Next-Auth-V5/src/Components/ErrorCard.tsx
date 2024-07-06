import { Card, CardFooter, CardHeader } from "@/Components/ui/card";
import Header from "./Header";
import BackButton from "./BackButton";

const ErrorCard = () => {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header label="Oops! Something Went Wrong!" />
            </CardHeader>

            <CardFooter>
                <BackButton
                    label="Back To Login"
                    href="/auth/login"
                />
            </CardFooter>
        </Card>
    )
};

export default ErrorCard;