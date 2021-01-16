import React from 'react'
import '@testing-library/jest-dom/extend-expect'

import {addUser, removeUser, updateUser} from './actions'
import {UsersReducer} from './reducers'
import {initialState} from './state'
import {userData} from '../../types'

const users: userData[] = [
    {
        id: 0,
        email: 'mehdi@x.com',
        first_name: 'mehdi',
        last_name: 'karimi',
        avatar: 'http://reqres.in'
    },
    {
        id: 1,
        email: 'sahand@x.com',
        first_name: 'sahand',
        last_name: 'ghorbani',
        avatar: 'http://reqres.in'
    }
]

it("Should add single user to state", () => {
    const user: userData = users[0]

    const reducedState = UsersReducer(initialState, addUser(user))
    expect(reducedState).toEqual({...initialState, users: [user], count: 1})
})

it("Should add list of users to state", () => {
    const reducedState = UsersReducer(initialState, addUser(users))
    expect(reducedState).toEqual({...initialState, users: [...users], count: 2})
})

it("Should update a user", () => {
    const reducedState = UsersReducer(initialState, addUser(users))
    const reducedUpdatedState = UsersReducer(reducedState, updateUser(1, {...users[1], first_name: 'sahand'}))

    expect(reducedUpdatedState.users[1]).toEqual({...users[1], first_name: 'sahand'})
})

it("Should remove a user with id", () => {
    const reducedState = UsersReducer(initialState, addUser(users))
    const reducedRemovedState = UsersReducer(reducedState, removeUser(0))

    expect(reducedRemovedState).toEqual({...initialState, users: [users[1]], count: 1})
})

it("Should update count and ids correctly", () => {
    const finalResult = {
        ...initialState,
        count: 3,
        users: [
            users[0],
            {
                ...users[0],
                id: 1,
                last_name: 'somex'
            },
            {
                ...users[1],
                id: 3
            }
        ]
    }

    const addedState = UsersReducer(initialState, addUser(users))
    const twiceAddedState = UsersReducer(addedState, addUser(users))
    const removedState = UsersReducer(twiceAddedState, removeUser(2))
    const updatedState = UsersReducer(removedState, updateUser(1, {...users[0], id: 24, last_name: 'somex'}))

    expect(updatedState).toEqual(finalResult)
})