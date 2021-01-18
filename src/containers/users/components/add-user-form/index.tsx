import React, {FunctionComponent, useState, MouseEvent} from 'react'

import {userData} from '../../../../types'

import useMediaQuery from '@material-ui/core/useMediaQuery'
import {useTheme} from '@material-ui/core/styles'
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

    const isAllFormsValidated = (forms: FormState[]) => 
        forms.reduce((acc, form) => 
            acc === false ?
                false :
                form.validated === true ?
                true : 
                false
        , true)

    const handleSaveClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        const allFormsArray: FormState[] = [
            firstNameForm,
            lastNameForm,
            emailForm,
            avatarForm
        ]
        if (isAllFormsValidated(allFormsArray) && firstNameForm.validated && firstNameForm.value !== undefined) {
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
                <InputField
                label="First Name"
                required={true}
                formState={firstNameForm}/>
                <InputField
                label="Last Name"
                required={true}
                formState={lastNameForm}/>
                <InputField
                label="Email"
                required={true}
                formState={emailForm}/>
                <InputField
                label="Avatar"
                formState={avatarForm}/>
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