import {userData} from '../../types'

export const ADD_USER = 'ADD_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SORT_USERS = 'SORT_USERS'
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY'

export interface AddUserAction {
    type: typeof ADD_USER,
    user: userData | userData[] | []
}

export interface UpdateUserAction {
    type: typeof UPDATE_USER,
    id: userData["id"],
    updatedUser: userData
}

export interface RemoveUserAction {
    type: typeof REMOVE_USER,
    id: userData["id"]
}

export interface SortUsersAction {
    type: typeof SORT_USERS,
    sort_key: string,
    ascending: boolean
}

export interface SetSearchQueryAction {
    type: typeof SET_SEARCH_QUERY,
    query: string
}

export type UsersActionTypes = AddUserAction | UpdateUserAction | RemoveUserAction | SortUsersAction | SetSearchQueryAction