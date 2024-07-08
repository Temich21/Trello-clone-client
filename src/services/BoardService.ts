import $api from './axiosInstance'

export interface Board {
  id: string
  name: string
}

export const createBoard = async (board: { name: string; userId: string }) => {
  const response = await $api.post<Board>('/board', board)
  return response.data
}

export const getAllBoards = async (userId: string) => {
  const response = await $api.get<Board[]>(`/board/all/${userId}`)
  return response.data
}

export const getBoard = async (boardId: string) => {
  const response = await $api.get<Board>(`/board/${boardId}`)
  return response.data
}