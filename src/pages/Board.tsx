// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEllipsis, faPlus } from '@fortawesome/free-solid-svg-icons'

import { useParams } from "react-router-dom"
import $api from "../services/axiosInstance"
import { Board as BoardType } from "../context/Board/BoardContext"
import { useQuery } from "@tanstack/react-query"

const getBoard = async (boardId: string) => {
    const response = await $api.get<BoardType>(`/board/${boardId}`)
    return response.data
}

export function Board() {
    const { id } = useParams<{ id: string }>()

    const { data: board, isLoading, isError } = useQuery({
        queryKey: ["board", id],
        queryFn: () => getBoard(id || '')
    })

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error loading board data</div>
    }

    return (
        <main>
            <header>
                <h1 className='p-4 pl-6 text-2xl text-white font-bold bg-[#9c446e]'>
                    {board?.name || 'Board not found'}
                </h1>
            </header>
            <div className='mt-3 ml-3 text-xl'>
                Data about Board...
            </div>
        </main>
        // <main className='bg-[#cd5a91] h-screen w-screen'>
        //     <header>
        //         <h1 className='p-4 pl-6 text-2xl text-white font-bold bg-[#9c446e]'>
        //             My first board
        //         </h1>
        //     </header>
        //     <div className="flex mt-3 ml-3 gap-5">
        //         <section className='w-60 p-3 bg-[#f1f2f4] rounded-lg'>
        //             <div className="flex justify-between items-center mb-2">
        //                 <h3 className='font-semibold'>My first column</h3>
        //                 <FontAwesomeIcon className='text-gray-600' icon={faEllipsis} />
        //             </div>
        //             <ul className='flex flex-col gap-2'>
        //                 <li className='p-2 rounded-md shadow-md bg-white'>My first Card</li>
        //                 <li className='p-2 rounded-md shadow-md bg-white'>My second Card</li>
        //             </ul>
        //             <div className='mt-4 flex justify-start items-center gap-2 font-semibold text-gray-600'>
        //                 <FontAwesomeIcon icon={faPlus} />
        //                 Add new Card
        //             </div>
        //         </section>
        //         <section className='w-60 p-3 bg-[#f1f2f4] rounded-lg'>
        //             <div className="flex justify-between items-center mb-2">
        //                 <h3 className='font-semibold'>My second column</h3>
        //                 <FontAwesomeIcon className='text-gray-600' icon={faEllipsis} />
        //             </div>
        //             <ul className='flex flex-col gap-2'>
        //                 <li className='p-2 rounded-md shadow-md bg-white'>My first Card</li>
        //                 <li className='p-2 rounded-md shadow-md bg-white'>My second Card</li>
        //             </ul>
        //             <div className='mt-4 flex justify-start items-center gap-2 font-semibold text-gray-600'>
        //                 <FontAwesomeIcon icon={faPlus} />
        //                 Add new Card
        //             </div>
        //         </section>
        //     </div>
        // </main>
    )
}

