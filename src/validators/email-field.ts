import {FormValidation} from '../hooks/useForm/types'

export const emailValidator = (email: string): FormValidation => {
    let emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if(email === '') 
        return {
            error: true,
            messages: ['Email field is required']
        }
    if(!emailRegex.test(email))
        return {
            error: true,
            messages: ['Email field should have correct structure: you@example.com']
        }
    return {
        error: false,
        messages: []
    }
}