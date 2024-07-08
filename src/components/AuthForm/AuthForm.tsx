import { useState } from "react";
import { AuthInput } from "./AuthInput";
import { AuthButton } from "./AuthButton";
import { AuthResponse, UserCredentials } from "../../context/Auth/AuthContext";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import { UseMutationResult } from "@tanstack/react-query";

interface AuthFormProps {
    authAction: UseMutationResult<AuthResponse, unknown, UserCredentials>
    isSingup: boolean
}

export function AuthForm({ authAction, isSingup }: AuthFormProps) {
    const [eye, setEye] = useState<boolean>(false)
    const AuthText = isSingup? "Sing Up": "Login"

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserCredentials>()


    function onSubmit(credentials: UserCredentials) {
        if (authAction.isPending) return
        authAction.mutate(credentials)
    }
    //grid grid-cols-[auto,1fr] gap-x-3 gap-y-5
    return (
        <>
            <h1 className="text-3xl font-bold mb-8 text-center">{AuthText}</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 items-center justify-items-end border-black">
                {isSingup &&
                    <div className="flex w-full">
                        <label className="font-bold" htmlFor="userName">Name</label>
                        <AuthInput
                            id="name"
                            type="text"
                            required
                            {...register("name", {
                                required: "Please Enter Your Name!",
                            })}
                        />
                    </div>
                }
                <div className="flex w-full">
                    <label className="font-bold" htmlFor="userName">Email</label>
                    <AuthInput
                        id="email"
                        type="text"
                        required
                        {...register("email", {
                            required: "Please Enter Your Email!",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Please Enter A Valid Email!"
                            }
                        })}
                    />
                </div>
                {errors.email && (
                    <p
                        className='text-red-600 font-semibold pl-2'
                    >
                        {errors.email?.message}
                    </p>
                )}
                <div className="flex w-full gap-1">
                    <label className="font-bold" htmlFor="userName">Password</label>
                    <AuthInput
                        id="password"
                        type={eye ? "text" : "password"}
                        required
                        {...register("password", {
                            required: "Please Enter Your Password",
                            minLength: {
                                value: 4,
                                message: "Password must be at least 4 characters long!"
                            }
                        })}
                    />
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            setEye(prev => !prev)
                        }}
                        className="w-9"
                    >
                        {
                            eye ?
                                <FontAwesomeIcon className="h-6" icon={faEye} /> :
                                <FontAwesomeIcon className="h-6" icon={faEyeSlash} />
                        }
                    </button>
                </div>
                {errors.password && (
                    <p
                        className='text-red-600 font-semibold pl-2'
                    >
                        {errors.password?.message}
                    </p>
                )}
                <AuthButton
                    disabled={authAction.isPending}
                    type="submit"
                    className="col-span-full"
                >
                    {authAction.isPending ? "Loaing..." : AuthText}
                </AuthButton>
            </form>
        </>
    )
}