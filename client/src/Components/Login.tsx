"use client";
import { useState } from "react";
import { LoginAPI } from "../services";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Login = () => {

    const [formData, setFormData] = useState<any>({
        email: "",
        password: "",
    });

    const router = useRouter();

    const handleSubmit = async (e: any) => {

        e.preventDefault();

        if (formData.email === "") {

            alert("Email Is Required!");

        } else if (formData.password === "") {

            alert("Password Is Required!");

        }

        try {

            const response: any = await LoginAPI(formData);

            localStorage.setItem("token", response.data.access_token);

            Cookies.set("token", response.data.access_token, { expires: 7 });

            router.push("/");

        } catch (error) {

            alert(`Error. ${error}`);

        }

    };

    return (
        <div className="text-white h-screen">
            <form
                className="flex flex-col items-center justify-center space-y-6 h-full font-medium"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col">
                    <label className="mb-2 text-white text-lg">
                        Email:
                    </label>

                    <input
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="text-sm p-2 rounded-md w-80 text-white"
                        placeholder="Enter Your Email"
                        value={formData.email}
                        type="email"
                        name="email"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="mb-2 text-white text-lg">
                        Password:
                    </label>

                    <input
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="text-sm p-2 rounded-md w-80"
                        placeholder="Enter Your Password"
                        value={formData.password}
                        type="password"
                        name="password"
                    />
                </div>

                <div className="flex flex-col items-center">
                    <button
                        className="bg-white text-black py-2 px-4 text-md font-bold rounded-md mt-2"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
};

export default Login;