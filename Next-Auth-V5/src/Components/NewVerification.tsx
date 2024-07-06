"use client";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import CardWrapper from "@/Components/CardWrapper";
import FormSuccess from "@/Components/FormSuccess";
import FormError from "@/Components/FormError";
import { useSearchParams } from "next/navigation";
import { BeatLoader } from "react-spinners";

const NewVerification = () => {

    const [error, setError] = useState<string | undefined>();

    const [success, setSuccess] = useState<string | undefined>();

    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {

        if (success || error) return;

        if (!token) {

            setError("Missing Token!");

            return;

        }

        newVerification(token)
            .then((data) => {
                setSuccess(data.success);
                setError(data.error);
            })
            .catch(() => {
                setError("Something Went Wrong!");
            });

    }, [token, success, error]);

    useEffect(() => {

        onSubmit();

    }, [onSubmit()]);

    return (
        <CardWrapper
            headerLabel="Confirming Your Verification"
            backButtonLabel="Back To Login"
            backButtonHref="/auth/login"
        >
            <div className="flex items-center w-full justify-center">
                {!success && !error && (
                    <BeatLoader />
                )}

                <FormSuccess message={success} />

                {!success && (
                    <FormError message={error} />
                )}
            </div>
        </CardWrapper>
    )
};

export default NewVerification;