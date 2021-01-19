import { userData } from "../../../types";

export const searchUsersBy = (users: userData[], searchQuery: string): userData[] => {
    const queryRegex = new RegExp(searchQuery, 'i')
    
    return users.filter(user => {
        return queryRegex.test(`${user.first_name} ${user.last_name} ${user.email}`)
    })
}