import { UseMutationResult, useMutation } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { ReactNode, createContext, useContext } from "react"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import $api from "../../services/axiosInstance"

type AuthContext = {
    user?: User
    singup: UseMutationResult<AuthResponse, unknown, UserCredentials>
    login: UseMutationResult<AuthResponse, unknown, UserCredentials>
    logout: UseMutationResult<AxiosResponse, unknown, void>
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>
    setAccessToken: React.Dispatch<React.SetStateAction<string | undefined>>
}

type User = {
    id: string,
    name: string,
    email: string,
}

export type UserCredentials = {
    name?: string,
    email: string,
    password: string
}

export type AuthResponse = {
    accessToken: string
    user: User
}

const Context = createContext<AuthContext | null>(null)

export function useAuth() {
    return useContext(Context) as AuthContext
}

type AuthProviderProps = {
    children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    const authInstance = import.meta.env.VITE_AUTH_API
    const [user, setUser] = useLocalStorage<User>("user")
    const [, setAccessToken] = useLocalStorage<string>("token")

    const singup = useMutation({
        mutationFn: (userCredentials: UserCredentials) => {
            return $api
                .post(`${authInstance}/singup`, userCredentials)
                .then(res => {
                    return res.data as AuthResponse
                })
        },
        onSuccess(data) {
            setUser(data.user)
            setAccessToken(data.accessToken)
        }
    })

    const login = useMutation({
        mutationFn: (userCredentials: UserCredentials) => {
            return $api
                .post(`${authInstance}/login`, userCredentials)
                .then(res => {
                    return res.data as AuthResponse
                })
        },
        onSuccess(data) {
            setUser(data.user)
            setAccessToken(data.accessToken)
        }
    })

    const logout = useMutation({
        mutationFn: () => {
            return $api
                .get(`${authInstance}/logout`)
        },
        onSuccess() {
            setUser(undefined)
            setAccessToken(undefined)
        }
    })

    return <Context.Provider value={{ singup, login, user, logout, setUser, setAccessToken }} >
        {children}
    </Context.Provider>
}