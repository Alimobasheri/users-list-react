import React, {FunctionComponent, useState, useContext} from 'react'

import {UsersContext} from '../../../../contexts/users'

import List from '@material-ui/core/List'
import Paper from '@material-ui/core/Paper'
import {makeStyles} from '@material-ui/core/styles'

import UserRow from '../user-row'
import EditForm from '../edit-form'
import DeleteDialog from '../delete-dialog'

import {userData} from '../../../../types'

import {sortUsersBy, searchUsersBy} from '../../utils'

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
        searchQuery,
        ascending,
        sort_key,
        onUpdateUser,
        onRemoveUser,
    } = useContext(UsersContext)
    
    const classes = useListStyles()

    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [editingUser, setEditingUser] = useState<userData | null>(null)

    const [openDeletingDialog, setOpenDeletingDialog] = useState(false)
    const [deletingUser, setDeletingUser] = useState<userData | null>(null)

    const closeDialogs = () => {
        setOpenEditDialog(false)
        setOpenDeletingDialog(false)
    }

    const handleEdit = (user: userData) => {
        setEditingUser(user)
        setOpenEditDialog(true)
    }

    const saveUpdatedUser = (user: userData, updatedUser: userData) => {
        onUpdateUser && onUpdateUser(user.id, updatedUser)
        setEditingUser(null)
        closeDialogs()
    }

    const handleDelete = (user: userData) => {
        setDeletingUser(user)
        setOpenDeletingDialog(true)
    }

    const removeChosenUser = () => {
        onRemoveUser && deletingUser && onRemoveUser(deletingUser.id)
        setDeletingUser(null)
        closeDialogs()
    }

    const usersRows = () => {
        if(users) {
            let usersToRender = users

            if (searchQuery && searchQuery !== '') {
                usersToRender = searchUsersBy(usersToRender, searchQuery)
            }

            if(sort_key && ascending !== undefined) {
                usersToRender = sortUsersBy(usersToRender, sort_key, ascending)
            }

            return usersToRender.map(user => 
                <UserRow
                key={user.id}
                user={user}
                onEdit={handleEdit}
                onDelete={handleDelete} />
            )
        }

        return null
    }

    return(
        <List
        className={classes.root}
        component={Paper}
        elevation={0}>
            {usersRows()}
        {openEditDialog && editingUser !== null &&
            <EditForm
            user={editingUser}
            open={openEditDialog}
            onSave={saveUpdatedUser}
            onCancel={closeDialogs}/>
        }
        {openDeletingDialog && deletingUser !== null &&
            <DeleteDialog
            user={deletingUser}
            open={openDeletingDialog}
            onOk={removeChosenUser}
            onCancel={closeDialogs} />
        }
        </List>
    )
}

export default UsersList