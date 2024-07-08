import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/Auth/AuthContext";
import { useBoard } from "../../context/Board/BoardContext";
import { SideMenu } from "../../components/SideMenu/SideMenu";
import { useEffect } from "react";

export function RootLayout() {
    const { user } = useAuth()
    if (user == null) return <Navigate to="/login" />

    const { getBoards } = useBoard()

    useEffect(() => {
        getBoards.mutate(user?.id)
    }, [])

    if (getBoards.isPending) {
        return (
            <div className="h-screen flex justify-center items-center text-5xl">
                Loading...
            </div>
        )
    }

    return <div className="flex">
        <SideMenu />
        <Outlet />
    </div>
}