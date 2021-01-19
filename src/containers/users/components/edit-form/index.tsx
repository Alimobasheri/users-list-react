import React, {FunctionComponent, useState, MouseEvent} from 'react'

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

interface EditFormProps {
    user: userData,
    open: boolean,
    onSave?: (user: userData, updatedUser: userData) => void,
    onCancel?: Function
}

const EditForm: FunctionComponent<EditFormProps> = ({user, open, onSave, onCancel}) => {
    const theme = useTheme()
    const mediaQuery = useMediaQuery(theme.breakpoints.down('sm'))

    const firstNameForm = useForm({value: user.first_name, validated: true, validator: nameValidator})
    const lastNameForm = useForm({value: user.last_name, validated: true, validator: nameValidator})
    const emailForm = useForm({value: user.email, validated: true, validator: emailValidator})

    const allFormsArray: FormState[] = [
        firstNameForm,
        lastNameForm,
        emailForm
    ]

    const handleSaveClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        if (isAllFormsValidated(allFormsArray) && firstNameForm.validated && firstNameForm.value !== undefined) {
            const updatedUser: userData = {
                ...user,
                first_name: (firstNameForm.value as any),
                last_name: (lastNameForm.value as any),
                email: (emailForm.value as any)
            } as const
            onSave && onSave(user, updatedUser)
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
                container>
                    <Grid
                    item
                    xs={12}
                    spacing={4}>
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

export default EditForm