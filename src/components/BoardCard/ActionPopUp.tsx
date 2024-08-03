import { Dispatch, SetStateAction } from 'react'
import { useBoard } from '../../context/Boards/BoardsContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'

type ActionPopUp = {
    boardId: string,
    boarName: string,
    changedBoardName: string,
    setChangedBoardName: Dispatch<SetStateAction<string>>
}

const ActionPopUp = ({ boardId, boarName, changedBoardName, setChangedBoardName }: ActionPopUp) => {
    const { editedBoard, setEditedBoard, deleteBoard, updateBoard } = useBoard()

    const handleDeleteBoard = (boardId: string) => {
        deleteBoard.mutate(boardId)
    }

    const handleUpdateBoard = (boardId: string) => {
        if (changedBoardName === boarName) {
            setChangedBoardName('')
            setEditedBoard('')
            return
        }

        updateBoard.mutate({ id: boardId, name: changedBoardName })
        setChangedBoardName('')
        setEditedBoard('')
    }

    return (
        <ul className='absolute right-0 top-full mt-2 rounded-md bg-white shadow-lg py-2'>
            {editedBoard !== boardId
                ? <li
                    className='flex gap-2 items-center hover:bg-gray-300 cursor-pointer px-2'
                    onClick={() => {
                        setEditedBoard(boardId)
                        setChangedBoardName(boarName)
                    }}
                >
                    <FontAwesomeIcon icon={faPenToSquare} />
                    Change Name
                </li>
                : <li
                    className='flex gap-2 items-center hover:bg-gray-300 cursor-pointer px-2'
                    onClick={() => {
                        setEditedBoard('')
                        handleUpdateBoard(boardId)
                    }}
                >
                    <FontAwesomeIcon icon={faCheck} />
                    Change Name
                </li>
            }
            <li
                className='flex gap-2 items-center hover:bg-gray-300 cursor-pointer px-2'
                onClick={() => handleDeleteBoard(boardId)}
            >
                <FontAwesomeIcon icon={faTrash} />
                Delete
            </li>
        </ul>
    )
}

export default ActionPopUp