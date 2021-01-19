export interface FormValidation {
    error: boolean,
    messages: string[] | []
}

export interface FormArgs {
    value?: string | number | any,
    onChange?: (value: FormArgs["value"]) => void,
    validated?: boolean,
    validator?: (value: FormArgs["value"]) => FormValidation
}

export interface FormState {
    value: string | number | undefined,
    onChange: (value: FormArgs["value"]) => void,
    validated: boolean,
    errorMessages: string[] | []
}