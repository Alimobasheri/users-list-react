import {FormValidation} from '../hooks/useForm/types'

export const nameValidator = (name: string): FormValidation => {
    let nameRegex = /^[a-zA-Z]+$/
    if(name === '') 
        return {
            error: true,
            messages: ['Name field is required']
        }
    if(!nameRegex.test(name))
        return {
            error: true,
            messages: ['Name field should only contain alphabets.']
        }
    return {
        error: false,
        messages: []
    }
}