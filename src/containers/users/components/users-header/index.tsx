import React, {FunctionComponent, MouseEvent, useContext, useState} from 'react'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {makeStyles, Theme} from '@material-ui/core/styles'

import {UsersContext} from '../../../../contexts/users'

import SearchInput from '../search-input'
import SelectSort from '../select-sort'
import AddUserForm from '../add-user-form'
import { userData } from '../../../../types'

const useHeaderStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        padding: theme.spacing(2)
    }
}))

const UsersHeader: FunctionComponent<{}> = () => {
    const classes = useHeaderStyles()

    const {count, onAddUser} = useContext(UsersContext)

    const [openAddUserDialog, setOpenAddUserDialog] = useState(false)

    const saveNewUser = (user: userData) => {
        onAddUser && onAddUser(user)
        setOpenAddUserDialog(false)
    }

    return (
        <Grid
        className={classes.root}
        container
        spacing={3}
        alignItems="center">
            <Grid
            item
            xs={12}
            md={8}>
                <Typography
                variant="h1">
                    Users
                </Typography>
            </Grid>
            <Grid
            item
            xs={12}
            md={4}>
                <Typography
                variant="body1">
                    {count} users
                </Typography>
            </Grid>
            <Grid
            item
            xs={12}>
                <SelectSort />
            </Grid>
            <Grid
            item
            xs={12}>
                <SearchInput />
            </Grid>
            <Grid
            item
            xs={12}>
                <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenAddUserDialog(true)}>
                    Add User
                </Button>
            </Grid>
            <AddUserForm
            open={openAddUserDialog}
            onSave={saveNewUser}
            onCancel={() => setOpenAddUserDialog(false)}/>
        </Grid>
    )
}

export default UsersHeader