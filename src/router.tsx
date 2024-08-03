import { Outlet, createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "./pages/layouts/AuthLayout";
import { Login } from "./pages/Login";
import { Singup } from "./pages/Singup";
import { AuthProvider } from "./context/Auth/AuthContext";
import { BoardsProvider } from "./context/Boards/BoardsContext";
import { RootLayout } from "./pages/layouts/RootLayout";
import { Home } from "./pages/Home";
import { Board } from "./pages/Board";

export const router = createBrowserRouter([
    {
        element: <ContextWrapper />,
        children: [
            {
                path: "/",
                element: <RootLayout />,
                children: [
                    { index: true, element: <Home /> },
                    {
                        path: '/board', children: [
                            { path: ":id", element: <Board /> }
                        ]
                    }
                ]
            },
            {
                element: <AuthLayout />,
                children: [
                    { path: 'login', element: <Login /> },
                    { path: 'singup', element: <Singup /> }
                ]
            }
        ]

    }
])

function ContextWrapper() {
    return (
        <AuthProvider>
            <BoardsProvider>
                <Outlet />
            </BoardsProvider>
        </AuthProvider>
    )
}