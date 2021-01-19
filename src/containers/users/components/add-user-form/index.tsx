import React, {FunctionComponent, useEffect, MouseEvent} from 'react'

import {userData} from '../../../../types'

import useMediaQuery from '@material-ui/core/useMediaQuery'
import {useTheme} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

import InputField from '../../../../components/input-field'

import useForm from '../../../../hooks/useForm'

import {nameValidator, emailValidator} from '../../../../validators'
import { FormState } from '../../../../hooks/useForm/types'

import {isAllFormsValidated} from '../../utils'

interface AddUserFormProps {
    open: boolean,
    onSave?: (user: userData) => void,
    onCancel?: Function
}

const AddUserForm: FunctionComponent<AddUserFormProps> = ({open, onSave, onCancel}) => {
    const theme = useTheme()
    const mediaQuery = useMediaQuery(theme.breakpoints.down('sm'))

    const firstNameForm = useForm({value: '', validated: true, validator: nameValidator})
    const lastNameForm = useForm({value: '', validated: true, validator: nameValidator})
    const emailForm = useForm({value: '', validated: true, validator: emailValidator})
    const avatarForm = useForm({value: '', validated: true})

    const allFormsArray: FormState[] = [
        firstNameForm,
        lastNameForm,
        emailForm,
        avatarForm
    ]

    const handleSaveClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        if (isAllFormsValidated(allFormsArray)) {
            const user: userData = {
                id: 0,
                first_name: (firstNameForm.value as any),
                last_name: (lastNameForm.value as any),
                email: (emailForm.value as any),
                avatar: (avatarForm.value as any)
            } as const
            onSave && onSave(user)
        }
    }

    const handleCancelClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        onCancel && onCancel()
    }

    return (
        <Dialog
        fullScreen={mediaQuery}
        open={open}>
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To edit current user you can change their data in the following fields:
                </DialogContentText>
                <Grid
                container
                spacing={4}>
                    <Grid
                    item
                    xs={12}>
                        <InputField
                        label="First Name"
                        required={true}
                        formState={firstNameForm}/>
                    </Grid>
                    <Grid
                    item
                    xs={12}>
                        <InputField
                        label="Last Name"
                        required={true}
                        formState={lastNameForm}/>
                    </Grid>
                    <Grid
                    item
                    xs={12}>
                        <InputField
                        label="Email"
                        required={true}
                        formState={emailForm}/>
                    </Grid>
                    <Grid
                    item
                    xs={12}>
                        <InputField
                        label="Avatar"
                        formState={avatarForm}/>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button 
                onClick={handleCancelClick}
                color="secondary">
                    Cancel
                </Button>
                <Button 
                onClick={handleSaveClick}
                color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddUserForm