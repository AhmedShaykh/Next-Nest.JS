import CardWrapper from "./CardWrapper";

const LoginForm = () => {
    return (
        <CardWrapper
            headerLabel="Welcome Back"
            backButtonLabel="Don't Have An Account"
            backButtonHref="/auth/register"
            showSocial
        >
            Login Form
        </CardWrapper>
    )
};

export default LoginForm;