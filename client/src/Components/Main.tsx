"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Main = () => {

    const [user, setUser] = useState<any>();

    const router = useRouter();

    useEffect(() => {

        FetchProfile();

    }, [])

    const FetchProfile = async () => {

        const response = await axios(`http://localhost:8080/api/users/me`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        });

        if (!response) {

            router.push("/login");

        } else {

            const res = await response.data;

            setUser(res);

        }

    };

    const Logout = () => {

        localStorage.removeItem("token");

        router.push("/login", { scroll: false });

    };

    return (
        <div className="flex flex-col justify-center items-center h-screen gap-5">
            <h1 className="text-3xl font-semibold">
                {user?.firstName} {user?.lastName}
            </h1>

            <button
                className="bg-white text-black py-2 px-4 text-md font-bold rounded-md"
                onClick={Logout}
            >
                Log Out
            </button>
        </div>
    )
};

export default Main;