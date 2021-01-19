import {
    ADD_USER,
    UPDATE_USER,
    REMOVE_USER,
    SORT_USERS,
    UsersActionTypes,
    SET_SEARCH_QUERY
} from './types'

import {
    initialState,
    Users
} from './state'

export const UsersReducer = (
    state: Users =initialState,
    action: UsersActionTypes
): Users => {
    switch(action.type) {
        case ADD_USER:
            return Array.isArray(action.user) ?
                {
                    ...state,
                    users: [
                        ...state.users,
                        ...(action.user as any[]).map((user, idx) =>
                            ({
                                ...user,
                                id: state.count + idx
                            })
                        )
                    ],
                    count: state.count + action.user.length
                } :
                {
                    ...state,
                    users: [
                        ...state.users,
                        {
                            ...action.user,
                            id: state.users.length
                        }
                    ],
                    count: state.count + 1
                }
        case UPDATE_USER:
            return {
                ...state,
                users: (state.users as any[]).map(user => 
                    user.id !== action.id ?
                        user:
                        {
                            ...action.updatedUser,
                            id: state.users[action.id].id
                        }
                )
            }
        case REMOVE_USER:
            return {
                ...state,
                users: (state.users as any[]).filter(user => 
                    user.id !== action.id
                ),
                count: state.count - 1
            }
        case SORT_USERS:
            return {
                ...state,
                sort_key: action.sort_key,
                ascending: action.ascending
            }
        case SET_SEARCH_QUERY:
            return {
                ...state,
                searchQuery: action.query
            }
        default:
            return state
    }
}