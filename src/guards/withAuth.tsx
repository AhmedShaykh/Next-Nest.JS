"use client";
import React, { useEffect, useState } from "react";
import { addUser, UserDetail } from "@/redux/user/counterSlice";
import { getUserDetails } from "@/services/index.service";
import { useSelector, useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";

const withAuth = (Component: any) => {

    return (props: any) => {

        const router = useRouter();

        const pathname = usePathname();

        const [verified, setVerified] = useState(false);

        console.log(verified, "verify");

        const dispatch = useDispatch();

        const userData = useSelector(UserDetail);

        useEffect(() => {

            console.log(userData, "userGet");

        }, [userData]);

        useEffect(() => {

            const token = localStorage.getItem("token");

            console.log("Before getUserData");

            const getUserData = async () => {

                try {

                    const response = await getUserDetails();

                    if (token && response.data.first_name?.length > 0) {

                        setVerified(true);

                    }

                    dispatch(addUser(response.data));

                } catch (error) {

                    console.error("Error fetching user data:", error);

                }

                console.log("After getUserData");

            };

            if (pathname === "/login") {

                router.replace("/");

                getUserData();

            }

            if (token) {

                getUserData();

            }

            if (!token) {

                router.replace("/login");

            }

        }, [dispatch, router]);

        if (verified) {

            return <Component {...props} />;

        } else {

            return null;

        }
    };
};

export default withAuth;