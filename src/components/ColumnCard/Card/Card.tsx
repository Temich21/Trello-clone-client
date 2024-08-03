import React, { useState } from 'react'
import { Input } from '../../Input'
import { Card as CardType, UpdateCardCredentials } from '../../../services/BoardService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare, faCheck } from '@fortawesome/free-solid-svg-icons'
import { UseMutationResult } from '@tanstack/react-query'

type Card = {
    card: CardType
    updateCard: UseMutationResult<CardType, Error, UpdateCardCredentials, unknown>
    deleteCard: UseMutationResult<string, Error, string, unknown>
}

const Card = React.memo(({ card, updateCard, deleteCard }: Card) => {
    const { id, name } = card

    const [editedCard, setEditedCard] = useState<string>('')//?
    const [changedCardName, setChangedCardnName] = useState<string>('') //?

    const handleUpdateCard = (data: UpdateCardCredentials, name: string) => {
        if (data.name === '') return

        if (data.name === name) {
            setEditedCard('')
            setChangedCardnName('')
            return
        }

        updateCard.mutate(data)
        setEditedCard('')
        setChangedCardnName('')
    }

     const handleDeleteCard = (id: string) => {
        deleteCard.mutate(id)
    }

    return (
        <li
            key={id}
            className='flex justify-between items-center p-2 rounded-md shadow-md bg-white text-lg'
        >
            {editedCard !== id ?
                    <>
                        <h3 className='font-semibold text-lg'>{name}</h3>
                        <div className='flex gap-3'>
                            <FontAwesomeIcon
                                className='text-gray-600 cursor-pointer'
                                icon={faPenToSquare}
                                onClick={() => {
                                    setEditedCard(id)
                                    setChangedCardnName(name)
                                }}
                            />
                            <FontAwesomeIcon
                                className='text-gray-600 cursor-pointer'
                                icon={faTrash}
                                onClick={() => handleDeleteCard(id)}
                            />
                        </div>
                    </>
                    : <>
                        <Input
                            id="editBoardName"
                            required
                            value={changedCardName}
                            onChange={e => setChangedCardnName(e.currentTarget.value)}
                            className='w-full h-full mr-2'
                        />
                        <div className='flex gap-3'>
                            <FontAwesomeIcon
                                className='text-gray-600 cursor-pointer'
                                icon={faCheck}
                                onClick={() => handleUpdateCard({ id, name: changedCardName }, name)}
                            />
                            <FontAwesomeIcon
                                className='text-gray-600 cursor-pointer'
                                icon={faTrash}
                                onClick={() => handleDeleteCard(id)}
                            />
                        </div>
                    </>
                }
        </li>
    )
})

export default Card