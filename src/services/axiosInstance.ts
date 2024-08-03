import axios from 'axios';
import { AuthResponse } from '../context/Auth/AuthContext';
import { useAuth } from '../context/Auth/AuthContext'

const $api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials: true
})

$api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

function setCookie(name: string, value: string) {
    document.cookie = name + "=" + value
}

const token = localStorage.getItem('refreshToken');
if (token) {
    setCookie('refreshToken', token)
}

$api.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config
    if (error.response.status == 401 && originalRequest && !originalRequest._isRetry) {
        originalRequest._isRetry = true
        try {
            const response = await axios.get<AuthResponse>(`${import.meta.env.VITE_SERVER_URL}/auth/refresh`, { withCredentials: true })
            const { setAccessToken } = useAuth()
            setAccessToken(response.data.accessToken)
            return $api.request(originalRequest)
        } catch (e) {
            const { setUser, setAccessToken } = useAuth()
            setUser(undefined)
            setAccessToken(undefined)
            console.log('NOT AUTHORIZED')
        }
    }
    throw error
})


export default $api
