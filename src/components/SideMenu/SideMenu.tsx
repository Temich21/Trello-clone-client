import { useState } from 'react'
import { useAuth } from "../../context/Auth/AuthContext";
import { useBoard } from '../../context/Boards/BoardsContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';

export function SideMenu() {
    const navigate = useNavigate()

    const { logout } = useAuth()
    const { boards } = useBoard()

    const [isOpen, setIsOpen] = useState(true)

    const handleClick = () => {
        setIsOpen(prev => !prev)
    }

    const handleLogout = () => {
        logout.mutate()
    }

    return (
        isOpen ? (
            <nav className="bg-[#ad4c7a] h-screen w-60 border-[#ac6285] border-r-2 p-2 pt-4 text-white">
                <div className='flex justify-between items-center text-xl font-semibold pb-2 pr-2 '>
                    <div
                        className='cursor-pointer'
                        onClick={() => navigate('')}
                    >
                        Home
                    </div>
                    <FontAwesomeIcon
                        className='cursor-pointer'
                        icon={faChevronLeft}
                        onClick={handleClick}
                    />
                </div>
                <div className='flex items-center pr-2 mb-2 gap-3'>
                    <h2 className='text-xl font-semibold'>Your Boards</h2>
                    <FontAwesomeIcon
                        className='cursor-pointer'
                        icon={faPlus}
                    />
                </div>
                <ul className='pl-2 pb-2'>
                    {boards.length && boards.map(({ id, name }) => (
                        <li
                            className='cursor-pointer'
                            key={id}
                            onClick={() => navigate(`board/${id}`)}
                        >
                            {name}
                        </li>
                    ))}
                </ul>
                <div
                    className='text-xl font-semibold cursor-pointer'
                    onClick={handleLogout}
                >
                    Logout
                </div>
            </nav>
        ) : (
            <nav className="bg-[#ad4c7a] h-screen w-6 border-[#ac6285] border-r-2">
                <div className='absolute top-8 left-1 transform -translate-y-1/2' >
                    <div
                        className='w-9 p-2 flex items-center justify-center bg-[#893c61] border-[#ac6285] border-2 rounded-full cursor-pointer'
                        onClick={handleClick}
                    >
                        <FontAwesomeIcon
                            className='text-white'
                            icon={faChevronRight}
                        />
                    </div>
                </div >
            </nav >
        )
    )
}