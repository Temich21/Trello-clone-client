import { UseMutationResult, useMutation } from "@tanstack/react-query"
import { ReactNode, createContext, useContext, useState } from "react"
import $api from "../../services/axiosInstance"

type BoardContext = {
    boards: Board[]
    getBoards: UseMutationResult<Board[], unknown, string>
    createBoard: UseMutationResult<Board, unknown, CreateBoardCredentials>
    updateBoard: UseMutationResult<Board, unknown, UpdateBoardCredentials>
    deleteBoard: UseMutationResult<string, unknown, string>
}

export type Board = {
    id: string,
    name: string,
}

type CreateBoardCredentials = {
    name: string,
    userId: string
}

type UpdateBoardCredentials = Partial<CreateBoardCredentials> & {
    id: string
}

const Context = createContext<BoardContext | null>(null)

export function useBoard() {
    return useContext(Context) as BoardContext
}

type BoardProviderProps = {
    children: ReactNode
}

export function BoardProvider({ children }: BoardProviderProps) {
    const [boards, setBoards] = useState<Board[]>([])
    const boardInstance = import.meta.env.VITE_BOARD_API

    const getBoards = useMutation({
        mutationFn: (userId: string) => {
            return $api
                .get(`${boardInstance}/all/${userId}`)
                .then(res => {
                    return res.data as Board[]
                })
        },
        onSuccess(data) {
            setBoards(data)
        }
    })

    const createBoard = useMutation({
        mutationFn: (createBoardCredentials: CreateBoardCredentials) => {
            return $api
                .post(`${boardInstance}`, createBoardCredentials)
                .then(res => {
                    return res.data as Board
                })
        },
        onSuccess(newBoard) {
            setBoards([...boards, newBoard])
        }
    })

    const updateBoard = useMutation({
        mutationFn: (updateBoardCredentials: UpdateBoardCredentials) => {
            return $api
                .patch(`${boardInstance}/${updateBoardCredentials.id}`, updateBoardCredentials)
                .then(res => {
                    return res.data as Board
                })
        },
        onSuccess(updateBoard) {
            setBoards(boards.map(board => (board.id === updateBoard.id ? updateBoard : board)))
        }
    })

    const deleteBoard = useMutation({
        mutationFn: (boardId: string) => {
            return $api
                .delete(`${boardInstance}/${boardId}`)
                .then(res => {
                    return res.data as string
                })
        },
        onSuccess(boardId) {
            setBoards(boards.filter(({ id }) => id !== boardId))
        }
    })

    return <Context.Provider value={{ boards, getBoards, createBoard, updateBoard, deleteBoard }} >
        {children}
    </Context.Provider>
}