import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare, faCheck } from '@fortawesome/free-solid-svg-icons'
import { Card as CardType, Column, CreateCardCredentials, UpdateCardCredentials, UpdateColumnCredentials } from '../../services/BoardService'
import { Input } from '../Input'
import { UseMutationResult } from '@tanstack/react-query'
import AddNew from './AddNew'
import Card from './Card/Card'

type ColumnCardType = {
    column: Column
    updateColumn: UseMutationResult<Column, Error, UpdateColumnCredentials, unknown>
    deleteColumn: UseMutationResult<string, Error, string, unknown>
    createCard: UseMutationResult<CardType, Error, CreateCardCredentials, unknown>
    updateCard: UseMutationResult<CardType, Error, UpdateCardCredentials, unknown>
    deleteCard: UseMutationResult<string, Error, string, unknown>
}

const ColumnCard = React.memo(({ column, updateColumn, deleteColumn, createCard, updateCard, deleteCard }: ColumnCardType) => {
    const { id, name, cards } = column

    const [editedColumn, setEditedColumn] = useState<string>('') //?
    const [changedColumnName, setChangedColumnName] = useState<string>('') //?

    const handleAddCard = (name: string | undefined) => {
        if (name == null || name === "") return
        createCard.mutate({ name, columnId: id || '' })
    }

    const handleDeleteColumn = (id: string) => {
        deleteColumn.mutate(id)
    }

    const handleUpdateColumn = (data: UpdateColumnCredentials, name: string) => {
        if (data.name === '') return

        if (data.name === name) {
            setEditedColumn('')
            setChangedColumnName('')
            return
        }

        updateColumn.mutate(data)
        setEditedColumn('')
        setChangedColumnName('')
    }

    return (
        <section
            key={id}
            className='w-60 h-full p-3 bg-[#f1f2f4] rounded-lg'
        >
            <div className="h-8 flex justify-between items-center mb-2">
                {editedColumn !== id ?
                    <>
                        <h3 className='font-semibold text-lg'>{name}</h3>
                        <div className='flex gap-3'>
                            <FontAwesomeIcon
                                className='text-gray-600 cursor-pointer'
                                icon={faPenToSquare}
                                onClick={() => {
                                    setEditedColumn(id)
                                    setChangedColumnName(name)
                                }}
                            />
                            <FontAwesomeIcon
                                className='text-gray-600 cursor-pointer'
                                icon={faTrash}
                                onClick={() => handleDeleteColumn(id)}
                            />
                        </div>
                    </>
                    : <>
                        <Input
                            id="editBoardName"
                            required
                            value={changedColumnName}
                            onChange={e => setChangedColumnName(e.currentTarget.value)}
                            className='w-full h-full mr-2'
                        />
                        <div className='flex gap-3'>
                            <FontAwesomeIcon
                                className='text-gray-600 cursor-pointer'
                                icon={faCheck}
                                onClick={() => handleUpdateColumn({ id, name: changedColumnName }, name)}
                            />
                            <FontAwesomeIcon
                                className='text-gray-600 cursor-pointer'
                                icon={faTrash}
                                onClick={() => handleDeleteColumn(id)}
                            />
                        </div>
                    </>
                }
            </div>
            {!!cards.length &&
                <ul className='flex flex-col gap-2 mb-2'>
                    {cards.map((card) => (
                        <Card
                            card={card}
                            updateCard={updateCard}
                            deleteCard={deleteCard}
                        />
                    ))}
                </ul>}
            <AddNew
                handleAdd={handleAddCard}
                isColumn={false}
            />
        </section>
    )
})

export default ColumnCard