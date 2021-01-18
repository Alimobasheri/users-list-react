import React, {FunctionComponent, ChangeEvent, useEffect} from 'react'

import {FormState} from '../../hooks/useForm/types'

import TextField from '@material-ui/core/TextField'

export interface InputFieldProps {
    label?: string,
    name?: string,
    required?: boolean,
    formState: FormState,
    type?: string
}

const InputField: FunctionComponent<InputFieldProps> = (
    {
        label, 
        name, 
        required,
        type,
        formState:
            {
                value, 
                validated, 
                onChange, 
                errorMessages
            }
    }
) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        onChange(event.target.value)
    }

    return (
        <TextField 
        label={label || undefined}
        name={name || undefined}
        required={required || false}
        type={type || 'text'}
        value={value}
        onChange={handleChange}
        error={validated === false}
        helperText={errorMessages}
        data-testid="field-root"
        inputProps={{
            "data-testid": "input"
        }}
        />
    )
}

export default InputField