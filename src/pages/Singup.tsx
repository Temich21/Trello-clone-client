import { useAuth } from "../context/Auth/AuthContext";
import { Navigate } from "react-router-dom";
import { AuthForm } from "../components/AuthForm/AuthForm";

export function Singup() {
    const { singup, user } = useAuth()
    if (user != null) return <Navigate to="/" />

    return (
        <AuthForm authAction={singup} isSingup={true} />
    )
}