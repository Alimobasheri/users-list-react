import React, {FunctionComponent} from 'react'
import List from '@material-ui/core/List'
import Card from '@material-ui/core/Card'
import {makeStyles} from '@material-ui/core/styles'

import UserRow from '../user-row'

import {userData} from '../../../../types'

const useListStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 500,
        padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`
    }
}))

interface usersListProps {
    users: userData[]
}

const UsersList: FunctionComponent<usersListProps> = ({users}) => {
    const classes = useListStyles()

    const usersRows = users.map(user =>
        <UserRow
        key={user.id}
        user={user} />
    )

    return(
        <List
        className={classes.root}
        component={Card}>
            {usersRows}
        </List>
    )
}

export default UsersList