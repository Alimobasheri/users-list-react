import {createContext} from 'react'
import { userData } from '../../types'

interface ContextProps {
    users: userData[],
    isFetchingData: boolean,
    onAddUser: Function,
    onUpdateUser: Function,
    onRemoveUser: Function,
    onSortUsers: Function
}

const UsersContext = createContext<Partial<ContextProps>>({})

export default UsersContext