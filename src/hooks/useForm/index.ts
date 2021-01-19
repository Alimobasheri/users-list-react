import {useState} from 'react'

import {FormArgs, FormState, FormValidation} from './types'

const useForm = ({value, onChange, validated, validator}: FormArgs): FormState => {
    const [formValue, setFormValue] = useState(value || '')
    const [formValidated, setValidated] = useState(validated || true)
    const [formErrorMessages, setFormErrorMessages] = useState([])
    const validateForm = (updatedValue: typeof formValue) => {
        if(validator) {
            const validation: FormValidation = validator(updatedValue)
            if(validation.error) {
                setValidated(false)
                setFormErrorMessages(validation.messages as never[])
            } else {
                setValidated(true)
                setFormErrorMessages([])
            }
        }
    }

    const handleChange = (updatedValue: typeof formValue | any) => {
        onChange && typeof onChange === 'function' && onChange(updatedValue)
        setFormValue(updatedValue)
        validateForm(updatedValue)
    }

    return {
        value: formValue,
        validated: formValidated,
        onChange: handleChange,
        errorMessages: formErrorMessages
    } as const
}

export default useForm