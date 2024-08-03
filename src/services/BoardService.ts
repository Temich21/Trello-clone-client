import $api from "../services/axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Board as BoardType } from "../context/Boards/BoardsContext"

export type Card = {
  id: string,
  name: string,
  columnId?: string
}

export type Column = {
  id: string,
  name: string,
  cards: Card[]
}

export type BoardPageType = Partial<BoardType> & {
  columns: Column[]
}

export type CreateColumnCredentials = {
  name: string,
  boardId: string
}

export type CreateCardCredentials = {
  name: string,
  columnId: string
}

export type UpdateColumnCredentials = Partial<CreateColumnCredentials> & {
  id: string
}

export type UpdateCardCredentials = Partial<CreateCardCredentials> & {
  id: string
}

export const getBoard = async (boardId: string): Promise<BoardPageType> => {
  const response = await $api.get<BoardPageType>(`/board/${boardId}`);
  return response.data;
}

export const useBoardData = (boardId: string) => useQuery({
  queryKey: ['board', boardId],
  queryFn: () => getBoard(boardId),
})

export const useCreateColumn = (updateLocalBoard: (newColumn: Column) => void) => {
  return useMutation({
    mutationFn: (createColumnCredentials: CreateColumnCredentials) => {
      return $api.post<Column>('column', createColumnCredentials)
        .then(response => response.data)
    },
    onSuccess: (newColumn) => {
      updateLocalBoard({...newColumn, cards: []})
    },
  })
}

export const useUpdateColumn = (updateLocalBoard: (updatedColumn: Column) => void) => {
  return useMutation({
    mutationFn: (updateColumnCredentials: UpdateColumnCredentials) => {
      return $api.patch<Column>('column', updateColumnCredentials)
        .then(response => response.data)
    },
    onSuccess: (updatedColumn) => {
      updateLocalBoard(updatedColumn)
    },
  })
}

export const useDeleteColumn = (updateLocalBoard: (columnId: string) => void) => {
  return useMutation({
    mutationFn: (id: string) => {
      return $api.delete<string>(`column/${id}`)
      .then(response => response.data)
    },
    onSuccess: (columnId) => {
      updateLocalBoard(columnId)
    },
  })
}

export const useCreateCard = (updateLocalBoard: (newCard: Card) => void) => {
  return useMutation({
    mutationFn: (createCardCredentials: CreateCardCredentials) => {
      return $api.post<Card>('card', createCardCredentials)
        .then(response => response.data)
    },
    onSuccess: (newCard) => {
      updateLocalBoard(newCard)
    },
  })
}

export const useUpdateCard = (updateLocalBoard: (updatedCard: Card) => void) => {
  return useMutation({
    mutationFn: (updateCardCredentials: UpdateCardCredentials) => {
      return $api.patch<Card>('card', updateCardCredentials)
        .then(response => response.data)
    },
    onSuccess: (updatedCard) => {
      updateLocalBoard(updatedCard)
    },
  })
}

export const useDeleteCard = (updateLocalBoard: (cardId: string) => void) => {
  return useMutation({
    mutationFn: (id: string) => {
      return $api.delete<string>(`card/${id}`)
      .then(response => response.data)
    },
    onSuccess: (cardId) => {
      updateLocalBoard(cardId)
    },
  })
}