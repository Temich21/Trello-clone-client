import { useBoard } from '../../context/Boards/BoardsContext'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { Input } from '../Input'
import ActionPopUp from './ActionPopUp'

const BoardCard = ({ id, name }: { id: string, name: string }) => {
    const navigate = useNavigate()

    const { editedBoard } = useBoard()

    const [changedBoardName, setChangedBoardName] = useState<string>('')

    const [isPopUpVisible, setIsPopUpVisible] = useState<boolean>(false)
    const [popUpId, setPopUpId] = useState<string>('')

    return (
        <section className='relative inline-block w-60 p-3 bg-[#f1f2f4] rounded-lg '>
            <div
                className="flex justify-between items-center h-8"
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
                    </>
                    : <>
                        <Input
                            id="editBoardName"
                            required
                            value={changedBoardName}
                            onChange={e => setChangedBoardName(e.currentTarget.value)}
                            className='w-full h-full mr-2'
                        />
                    </>
                }
                <FontAwesomeIcon
                    icon={faEllipsis}
                    className='cursor-pointer'
                    onClick={() => {
                        setIsPopUpVisible((prev) => !prev)
                        setPopUpId(id)
                    }}
                />
                {isPopUpVisible && popUpId === id &&
                    <ActionPopUp
                        boardId={id}
                        boarName={name}
                        changedBoardName={changedBoardName}
                        setChangedBoardName={setChangedBoardName}
                    />
                }
            </div>
        </section>

    )
}

export default BoardCard