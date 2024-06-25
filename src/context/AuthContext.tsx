import { UseMutationResult, useMutation } from "@tanstack/react-query"
import axios, { AxiosResponse } from "axios"
import { ReactNode, createContext, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { useLocalStorage } from "../hooks/useLocalStorage"

type AuthContext = {
    user?: User
    signup: UseMutationResult<AxiosResponse, unknown, User>
    login: UseMutationResult<{ accessTokens: string, user: User }, unknown, string>
    logout: UseMutationResult<AxiosResponse, unknown, void>
}

type User = {
    id: string,
    name: string,
}

const Context = createContext<AuthContext | null>(null)

export function useAuth() {
    return useContext(Context) as AuthContext
}

type AuthProviderProps = {
    children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    const navigate = useNavigate()
    const [user, setUser] = useLocalStorage<User>("user")
    const [accessTokens, setAccessToken] = useLocalStorage<string>("token")

    const signup = useMutation({
        mutationFn: (user: User) => {
            return axios.post(`${import.meta.env.VITE_SERVER_URL}/signup`, user)
        },
        onSuccess() {
            navigate('/login')
        }
    })

    const login = useMutation({
        mutationFn: (id: string) => {
            return axios
                .post(`${import.meta.env.VITE_SERVER_URL}/login`, { id })
                .then(res => {
                    return res.data as { accessTokens: string, user: User }
                })
        },
        onSuccess(data) {
            setUser(data.user)
            setAccessToken(data.accessTokens)
        }
    })

    const logout = useMutation({
        mutationFn: () => {
            return axios
                .post(`${import.meta.env.VITE_SERVER_URL}/logout`, { accessTokens })
        },
        onSuccess() {
            setUser(undefined)
            setAccessToken(undefined)
        }
    })

    return <Context.Provider value={{ signup, login, user, logout }} >
        {children}
    </Context.Provider>
}