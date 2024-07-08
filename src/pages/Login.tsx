import { useAuth } from "../context/Auth/AuthContext";
import { Navigate } from "react-router-dom";
import { AuthForm } from "../components/AuthForm/AuthForm";

export function Login() {
    const { login, user } = useAuth()
    if (user != null) return <Navigate to="/" />

    return (
        <AuthForm authAction={login} isSingup={false}/>
    )
}