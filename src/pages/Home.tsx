import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../context/Auth/AuthContext'
import { useBoard } from '../context/Board/BoardContext'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function Home() {
  const { user } = useAuth()
  const { boards, createBoard, updateBoard, deleteBoard } = useBoard()

  const boardNameRef = useRef<HTMLInputElement>(null)

  const [editedBoard, setEditedBoard] = useState<string>('')
  const [changedBoardName, setChangedBoardName] = useState<string>('')

  const navigate = useNavigate()

  const handleCreateBoard = () => {
    const boardName = boardNameRef.current?.value

    if (boardName == null || boardName === "") {
      return
    }

    createBoard.mutate({ name: boardName, userId: user?.id || '' })
  }

  const handleDeleteBoard = (boardId: string) => {
    deleteBoard.mutate(boardId)
  }

  const handleUpdateBoard = (boardId: string, name: string) => {
    if (changedBoardName === name) {
      setChangedBoardName('')
      setEditedBoard('')
      return
    }

    updateBoard.mutate({ id: boardId, name: changedBoardName })
    setChangedBoardName('')
    setEditedBoard('')
  }

  return (
    <div className="bg-[#cd5a91] h-screen w-screen">
      <header>
        <h1 className='p-4 pl-6 text-2xl text-white font-bold bg-[#9c446e]'>
          Home
        </h1>
      </header>
      <main>
        <div className='flex mt-3 ml-3 gap-5'>
          <Input
            id="boardName"
            required
            ref={boardNameRef}
            className='w-60'
          />
          <Button
            className='w-60'
            onClick={handleCreateBoard}
          >
            Create New Board
          </Button>
        </div>
        <div className="flex flex-wrap mt-3 ml-3 gap-5">
          {boards?.length && boards.map(({ id, name }) => (
            <section className='w-60 p-3 bg-[#f1f2f4] rounded-lg'>
              <div
                className="flex justify-between items-center mb-2"
                key={id}
              >
                {editedBoard !== id ?
                  <>
                    <h3
                      className='font-semibold cursor-pointer'
                      onClick={() => navigate(`board/${id}`)}
                    >
                      {name}
                    </h3>
                    <FontAwesomeIcon
                      className='text-gray-600 cursor-pointer'
                      icon={faPenToSquare} //faEllipsis, faTrash
                      onClick={() => {
                        setEditedBoard(id)
                        setChangedBoardName(name)
                      }}
                    />
                  </>
                  : <>
                    <Input
                      id="editBoardName"
                      required
                      value={changedBoardName}
                      onChange={e => setChangedBoardName(e.currentTarget.value)}
                      className='w-60'
                    />
                    <FontAwesomeIcon
                      className='text-gray-600 cursor-pointer'
                      icon={faCheck} //faEllipsis, faTrash
                      onClick={() => handleUpdateBoard(id, name)}
                    />
                  </>
                }
                <FontAwesomeIcon
                  className='text-gray-600 cursor-pointer'
                  icon={faTrash}
                  onClick={() => handleDeleteBoard(id)}
                />
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  )
}

