import React, {FunctionComponent, useState, useContext} from 'react'

import {UsersContext} from '../../../../contexts/users'

import List from '@material-ui/core/List'
import Card from '@material-ui/core/Card'
import {makeStyles} from '@material-ui/core/styles'

import UserRow from '../user-row'
import EditForm from '../edit-form'

import {userData} from '../../../../types'

const useListStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 500,
        padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`
    }
}))

const UsersList: FunctionComponent<{}> = () => {
    const {
        users,
        isFetchingData,
        onUpdateUser,
        onRemoveUser,
        onAddUser,
        onSortUsers
    } = useContext(UsersContext)

    const classes = useListStyles()

    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [editingUser, setEditingUser] = useState<userData | null>(null)

    const handleEdit = (user: userData) => {
        setEditingUser(user)
        setOpenEditDialog(true)
    }

    const saveUpdatedUser = (user: userData, updatedUser: userData) => {
        onUpdateUser && onUpdateUser(user.id, updatedUser)
        setOpenEditDialog(false)
    }

    const closeDialog = () => setOpenEditDialog(false)

    const handleDelete = (user: userData) => onRemoveUser && onRemoveUser(user.id)

    const usersRows = () => 
        users && users.map(user =>
            <UserRow
            key={user.id}
            user={user}
            onEdit={handleEdit}
            onDelete={handleDelete} />
        )

    return(
        <List
        className={classes.root}
        component={Card}>
            {usersRows()}
        {openEditDialog && editingUser !== null &&
            <EditForm
            user={editingUser}
            open={openEditDialog}
            onSave={saveUpdatedUser}
            onCancel={closeDialog}/>
        }
        </List>
    )
}

export default UsersList