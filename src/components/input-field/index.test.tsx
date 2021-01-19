import {fireEvent, render, waitFor} from '@testing-library/react'
import {renderHook} from '@testing-library/react-hooks'
import { act } from 'react-dom/test-utils'

import useForm from '../../hooks/useForm'
import {nameValidator} from '../../validators'

import InputField, {InputFieldProps} from './index'

jest.useFakeTimers()

it("should render input field correctly", async () => {
    const changedFn = jest.fn()
    const {result} = renderHook(() => useForm({value: '', validated: false, validator: nameValidator, onChange:changedFn}))

    const {getByTestId, rerender} = render(
        <InputField
        label="first name"
        name="firstName"
        required={true}
        formState={result.current}/>
    )

    const field = getByTestId('field-root')
    const label = field.querySelector('label')
    const input = getByTestId('input')

    expect(field).toBeInTheDocument()
    expect(label).toHaveTextContent('first name')
    expect(input).toHaveAttribute('required')
    expect(input).toHaveAttribute('name', 'firstName')
    expect(input).toHaveAttribute('value', '')
    expect(result.current.value).toBe('')

    // Test correct input
    await waitFor(() => input !== null && fireEvent.change(input, {target: {value: 'ali'}}))

    expect(result.current.value).toBe('ali')
    expect(result.current.validated).toBe(true)

    rerender(<InputField label="first name" name="firstName" required={true} formState={result.current} />)
    expect(changedFn).toHaveBeenCalledTimes(1)
    expect(input).toHaveValue('ali')
    
    // Test uncorrect input
    await waitFor(() => input && fireEvent.change(input, {target: {value:'karim33'}}))
    
    expect(result.current.value).toBe('karim33')
    expect(result.current.validated).toBe(false)
    expect(result.current.errorMessages).toEqual(['Name field should only contain alphabets.'])
})