import { UseMutationResult, useMutation } from "@tanstack/react-query"
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react"
import $api from "../../services/axiosInstance"
import { useNavigate } from "react-router-dom"

type BoardsContext = {
    boards: Board[]
    editedBoard: string
    setEditedBoard: Dispatch<SetStateAction<string>>
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

const Context = createContext<BoardsContext | null>(null)

export function useBoard() {
    return useContext(Context) as BoardsContext
}

type BoardProviderProps = {
    children: ReactNode
}

export function BoardsProvider({ children }: BoardProviderProps) {
    const [boards, setBoards] = useState<Board[]>([])
    const [editedBoard, setEditedBoard] = useState<string>('')
    const navigate = useNavigate()

    const getBoards = useMutation({
        mutationFn: (userId: string) => {
            return $api
                .get(`board/all/${userId}`)
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
                .post('board', createBoardCredentials)
                .then(res => {
                    return res.data as Board
                })
        },
        onSuccess(newBoard) {
            setBoards([...boards, newBoard])
            navigate(`board/${newBoard.id}`)
        }
    })

    const updateBoard = useMutation({
        mutationFn: (updateBoardCredentials: UpdateBoardCredentials) => {
            return $api
                .patch('board', updateBoardCredentials)
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
                .delete(`board/${boardId}`)
                .then(res => {
                    return res.data as string
                })
        },
        onSuccess(boardId) {
            setBoards(boards.filter(({ id }) => id !== boardId))
        }
    })

    return <Context.Provider value={{ boards, editedBoard, setEditedBoard, getBoards, createBoard, updateBoard, deleteBoard }} >
        {children}
    </Context.Provider>
}