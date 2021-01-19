import {createContext} from 'react'
import { userData } from '../../types'

interface ContextProps {
    users: userData[],
    isFetchingData: boolean,
    sort_key: string,
    ascending: boolean,
    count: number,
    searchQuery: string,
    onAddUser: Function,
    onUpdateUser: Function,
    onRemoveUser: Function,
    onSortUsers: Function,
    onSetSearchQuery: Function
}

const UsersContext = createContext<Partial<ContextProps>>({})

export default UsersContext