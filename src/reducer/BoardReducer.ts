import { BoardPageType, Card, Column } from "../services/BoardService";

type Action =
    | { type: 'SET_BOARD'; payload: BoardPageType }
    | { type: 'ADD_COLUMN'; payload: Column }
    | { type: 'UPDATE_COLUMN'; payload: Column }
    | { type: 'DELETE_COLUMN'; payload: string }
    | { type: 'ADD_CARD'; payload: Card }
    | { type: 'UPDATE_CARD'; payload: Card }
    | { type: 'DELETE_CARD'; payload: string }

export function boardReducer(state: BoardPageType | undefined, action: Action): BoardPageType | undefined {
    switch (action.type) {
        case 'SET_BOARD':
            return action.payload
        case 'ADD_COLUMN':
            return state ? { ...state, columns: [...state.columns, action.payload] } : state
        case 'UPDATE_COLUMN':
            return state ? {
                ...state,
                columns: state.columns.map(column =>
                    column.id === action.payload.id ? { ...column, name: action.payload.name } : column
                )
            } : state
        case 'DELETE_COLUMN':
            return state ? {
                ...state,
                columns: state.columns.filter(column => column.id !== action.payload)
            } : state
        case 'ADD_CARD':
            return state ? {
                ...state,
                columns: state.columns.map(column =>
                    column.id === action.payload.columnId ? {
                        ...column,
                        cards: [...column.cards, action.payload]
                    } : column
                )
            } : state
        case 'UPDATE_CARD':
            return state ? {
                ...state,
                columns: state.columns.map(column =>
                    column.id !== action.payload.columnId ? {
                        ...column,
                        cards: column.cards.map(card =>
                            card.id === action.payload.id ? { ...card, name: action.payload.name } : card
                        )
                    } : column
                )
            } : state
        case 'DELETE_CARD':
            return state ? {
                ...state,
                columns: state.columns.map(column => ({
                    ...column,
                    cards: column.cards.filter(card => card.id !== action.payload)
                }))
            } : state
        default:
            return state
    }
}
