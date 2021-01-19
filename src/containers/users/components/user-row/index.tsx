import React, {FunctionComponent, MouseEvent} from 'react'

import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import {makeStyles, useTheme} from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

import {userData} from '../../../../types'

const useRowStyles = makeStyles(theme  => ({
    root: {
        width: '100%',
        padding: theme.spacing(2)
    },
    avatar: {
        width: 100,
        height: 100,
        [theme.breakpoints.down('sm')]: {
            width: 50,
            height: 50,
            '& > img': {
                width: 80,
                height: 80,
                objectFit: 'cover'
            }
        }
    },
    text: {
        padding: theme.spacing(1),
        marginLeft: theme.spacing(2),
        '& .MuiListItemText-secondary': {
            marginTop: theme.spacing(1)
        },
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(0.5),
            marginLeft: theme.spacing(1),
            '& .MuiListItemText-secondary': {
                marginTop: theme.spacing(0.5)
            },
        }
    }
}))

interface userRowProps {
    user: userData,
    onEdit?: Function,
    onDelete?: Function
}

const UserRow: FunctionComponent<userRowProps> = ({user, onEdit, onDelete}) => {
    const classes = useRowStyles()

    const theme = useTheme()
    const smMediaQuery = theme.breakpoints.down('sm')

    const handleEdit = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        typeof onEdit === 'function' && onEdit(user)
    }

    const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        typeof onDelete === 'function' && onDelete(user)
    }

    return (
        <ListItem
        className={classes.root}
        data-testid="row">
            <ListItemAvatar
            className={classes.avatar}
            data-testid="rowAvatar">
                <Avatar
                className={classes.avatar}
                data-testid="avatar">
                    <img
                    src={user.avatar}
                    alt={`${user.first_name} ${user.last_name} avatar`} 
                    data-testid="avatarImage"/>
                </Avatar>
            </ListItemAvatar>
            <ListItemText
            className={classes.text}
            primary={`${user.first_name} ${user.last_name}, ID: ${user.id}`}
            secondary={user.email} 
            data-testid="rowText"/>
            <ListItemSecondaryAction>
                <IconButton
                edge="end"
                aria-label="Edit"
                component="button"
                onClick={handleEdit}
                data-testid="editButton"
                disabled={typeof onEdit !== 'function'}
                size={smMediaQuery ? 'small' : 'medium'}>
                    <EditIcon
                    htmlColor="blue" />
                </IconButton>
                <IconButton
                edge="end"
                aria-label="Delete"
                component="button"
                onClick={handleDelete}
                data-testid="deleteButton"
                disabled={typeof onDelete !== 'function'}
                size={smMediaQuery ? 'small' : 'medium'}>
                    <DeleteIcon
                    htmlColor="red" />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default UserRow