import { useParams } from "react-router-dom"
import { useEffect, useReducer } from 'react'
import AddNew from '../components/ColumnCard/AddNew'
import ColumnCard from '../components/ColumnCard/ColumnCard'
import { useBoardData, useCreateColumn, useDeleteColumn, useUpdateColumn, Column, useCreateCard, Card, useUpdateCard, useDeleteCard } from '../services/BoardService'
import { boardReducer } from "../reducer/BoardReducer"


export function Board() {
    const { id } = useParams<{ id: string }>()

    const { data: board, isLoading, isError } = useBoardData(id || '')

    const [localBoard, dispatch] = useReducer(boardReducer, undefined)

    useEffect(() => {
        if (board) {
            dispatch({ type: 'SET_BOARD', payload: board })
        }
    }, [board])

    const handleAddColumn = (name: string | undefined) => {
        if (name == null || name === "") return
        createColumn.mutate({ name, boardId: id || '' })
    }

    const updateLocalColumnForCreate = (newColumn: Column) => {
        dispatch({ type: 'ADD_COLUMN', payload: newColumn })
    }

    const updateLocalColumnForUpdate = (updatedColumn: Column) => {
        dispatch({ type: 'UPDATE_COLUMN', payload: updatedColumn })
    }

    const updateLocalColumnForDelete = (columnId: string) => {
        dispatch({ type: 'DELETE_COLUMN', payload: columnId })
    }

    const updateLocalCardForCreate = (newCard: Card) => {
        dispatch({ type: 'ADD_CARD', payload: newCard })
    }

    const updateLocalCardForUpdate = (updatedCard: Card) => {
        dispatch({ type: 'UPDATE_CARD', payload: updatedCard })

    }

    const updateLocalCardForDelete = (cardId: string) => {
        dispatch({ type: 'DELETE_CARD', payload: cardId })
    }

    const createColumn = useCreateColumn(updateLocalColumnForCreate)
    const updateColumn = useUpdateColumn(updateLocalColumnForUpdate)
    const deleteColumn = useDeleteColumn(updateLocalColumnForDelete)

    const createCard = useCreateCard(updateLocalCardForCreate)
    const updateCard = useUpdateCard(updateLocalCardForUpdate)
    const deleteCard = useDeleteCard(updateLocalCardForDelete)

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error loading board data</div>

    return (
        <div className="bg-[#cd5a91] h-screen w-screen">
            <header>
                <h1 className='p-4 pl-6 text-2xl text-white font-bold bg-[#9c446e]'>
                    {localBoard?.name}
                </h1>
            </header>
            <main className='flex flex-wrap gap-3 mt-3 ml-3'>
                {!!localBoard?.columns.length
                    && localBoard?.columns.map((column) => (
                        <ColumnCard
                            column={column}
                            updateColumn={updateColumn}
                            deleteColumn={deleteColumn}
                            createCard={createCard}
                            updateCard={updateCard}
                            deleteCard={deleteCard}
                        />
                    ))
                }
                <AddNew
                    handleAdd={handleAddColumn}
                    isColumn={true}
                />
            </main>
        </div >
    )
}

