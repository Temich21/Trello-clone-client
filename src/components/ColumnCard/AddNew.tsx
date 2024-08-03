import React, { useEffect, useRef, useState } from 'react'
import { Input } from '../Input'
import { Button } from '../Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'

const AddNew = React.memo(({ handleAdd, isColumn }: { handleAdd: (name: string | undefined) => void, isColumn: boolean }) => {
    const [isInput, setIsInput] = useState<boolean>(false)

    const inputNameRef = useRef<HTMLInputElement>(null)
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sectionRef.current && !sectionRef.current.contains(event.target as Node)) {
                setIsInput(false)
            }
        };

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        isInput ? (
            <section
                ref={sectionRef}
                className={`bg-cardColor p-2 rounded-lg ${isColumn ? 'w-60 h-full' : 'w-full h-full'}`}
            >
                <Input
                    id="columnName"
                    ref={inputNameRef}
                    className='w-full mb-2'
                />
                <div className='flex gap-3 items-center'>
                    <Button
                        className='px-3 py-1'
                        onClick={() => handleAdd(inputNameRef.current?.value)}
                    >
                        Add {isColumn ? 'Column': 'Card'}
                    </Button>
                    <FontAwesomeIcon
                        icon={faXmark}
                        className='h-6 cursor-pointer'
                        onClick={() => setIsInput(prev => !prev)}
                    />
                </div>
            </section>
        ) : (
            <section
                className={`bg-cardColor p-2 pl-3 rounded-lg cursor-pointer ${isColumn ? 'w-60 h-full hover:bg-gray-400' : 'w-full h-10 hover:bg-gray-300'}`}
                onClick={() => setIsInput(prev => !prev)}
            >
                <div className='flex justify-start items-center gap-2 font-semibold text-gray-600'>
                    <FontAwesomeIcon
                        icon={faPlus}
                    />
                    Add new {isColumn ? 'Column': 'Card'}
                </div>
            </section>
        )
    )
})

export default AddNew

