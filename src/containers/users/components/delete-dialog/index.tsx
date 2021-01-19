import React, {FunctionComponent, MouseEvent} from 'react'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

import { userData } from '../../../../types'

interface DeleteDialogProps {
    user: userData,
    open: boolean,
    onOk: Function,
    onCancel: Function
}

const DeleteDialog: FunctionComponent<DeleteDialogProps> = ({user, open, onOk, onCancel}) => {
    const handleConfirmClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        onOk()
    }

    const handleCancelClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        onCancel()
    }

    return (
        <Dialog
        open={open}>
            <DialogTitle>User Delete Confiramation</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete user {`${user.first_name} ${user.last_name}`} ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button
                variant="outlined"
                color="default"
                onClick={handleCancelClick}>
                    Cancel
                </Button>
                <Button
                variant="contained"
                color="secondary"
                onClick={handleConfirmClick}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteDialog