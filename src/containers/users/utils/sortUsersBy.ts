import {userData} from '../../../types'

export const sortUsersBy = (users: userData[], sort_key: string, ascending: boolean): userData[] => {
    let sortedUsers = users

    sortedUsers.sort((a: any, b: any) => {
        if(ascending) {
            return a[sort_key] > b[sort_key] ? -1 : a[sort_key] < b[sort_key] ? 1 : 0
        } else {
            return a[sort_key] > b[sort_key] ? 1 : a[sort_key] < b[sort_key] ? -1 : 0
        }
    })

    return sortedUsers
}