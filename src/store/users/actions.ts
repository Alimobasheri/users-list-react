import {
    ADD_USER,
    UPDATE_USER,
    REMOVE_USER,
    SORT_USERS,
    UsersActionTypes,
} from './types'

import {userData} from '../../types'

export const addUser = (user: userData | userData[]): UsersActionTypes => {
    return ({
        type: ADD_USER,
        user
    })
}

export const updateUser = (id: userData["id"], updatedUser: userData): UsersActionTypes => {
    return ({
        type: UPDATE_USER,
        id,
        updatedUser
    })
}

export const removeUser = (id: userData["id"]): UsersActionTypes => {
    return ({
        type: REMOVE_USER,
        id
    })
}

export const sortUsers = (sort_key: keyof userData, ascending: boolean): UsersActionTypes => {
    return ({
        type: SORT_USERS,
        sort_key,
        ascending
    })
}