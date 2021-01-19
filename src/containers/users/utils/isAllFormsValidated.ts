import {FormState} from '../../../hooks/useForm/types'

export const isAllFormsValidated = (forms: FormState[]) => 
    forms.reduce((acc, form) => { 
        if(acc) {
            form.onChange(form.value)
            if(form.value !== '' && form.validated) {
                return true
            } else {
                return false
            }
        }
        return false
    }, true)