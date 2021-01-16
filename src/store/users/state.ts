import { userData } from "../../types"

export interface Users {
    users: userData[] | [],
    sort_key: string,
    ascending: boolean,
    count: number
}

export const initialState = {
    users: [],
    sort_key: 'id',
    ascending: false,
    count: 0
}