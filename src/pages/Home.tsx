import { useAuth } from '../context/Auth/AuthContext'
import { useBoard } from '../context/Boards/BoardsContext'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { useRef } from 'react'
import BoardCard from '../components/BoardCard/BoardCard'

export function Home() {
  const { user } = useAuth()
  const { boards, createBoard } = useBoard()

  const boardNameRef = useRef<HTMLInputElement>(null)

  const handleCreateBoard = () => {
    const boardName = boardNameRef.current?.value

    if (boardName == null || boardName === "") {
      return
    }

    createBoard.mutate({ name: boardName, userId: user?.id || '' })
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
            className='w-44 border-none'
            onClick={handleCreateBoard}
          >
            Create New Board
          </Button>
        </div>
        <div className="flex flex-wrap mt-3 ml-3 gap-5">
          {boards?.length && boards.map(({ id, name }) => (
             <BoardCard id={id} name={name} />
          ))}
        </div>
      </main>
    </div>
  )
}

