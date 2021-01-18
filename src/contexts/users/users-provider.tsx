import React, {useReducer, useEffect, FunctionComponent} from 'react'

import UsersContext from './users-context'

import {useFetch} from '../../hooks/useFetch'
import {fetchReturn, userData} from '../../types'

import {UsersReducer} from '../../store/users/reducers'
import {addUser, updateUser, removeUser, sortUsers} from '../../store/users/actions'
import {Users, initialState} from '../../store/users/state'

const UsersProvider: FunctionComponent<{}> = ({children}) => {
    const {loading, data}: fetchReturn = useFetch()
    
    const [usersState, usersDispatch] = useReducer(UsersReducer, initialState)

    const onAddUser = (user: userData[] | userData) => usersDispatch(addUser(user))
    const onUpdateUser = (id: userData["id"], updatedUser: userData) => usersDispatch(updateUser(id, updatedUser))
    const onRemoveUser = (id: userData["id"]) => usersDispatch(removeUser(id))
    const onSortUsers = (sort_key: keyof userData, ascending: boolean) => usersDispatch(sortUsers(sort_key, ascending))

    useEffect(() => {
        !loading ?
            data.data && Array.isArray(data.data) && onAddUser(data.data) :
            onAddUser([])
    }, [loading, data])

    return (
        <UsersContext.Provider
        value={{
            users: usersState.users,
            isFetchingData: loading,
            onAddUser,
            onUpdateUser,
            onRemoveUser,
            onSortUsers
        }}>
            {children}
        </UsersContext.Provider>
    )
} 

export default UsersProvider