import {renderHook, act} from '@testing-library/react-hooks'
import useForm from './index'
import { FormArgs, FormValidation } from './types'
import {nameValidator, emailValidator} from '../../validators'

it("should be a function", () => {
    expect(typeof useForm).toBe('function')
})

it("should return a form object correctly", () => {
    const changeFn = jest.fn()
    const validataorFn = jest.fn((value) => ({error: false, messages: []}))
    const {result} = renderHook(() => useForm({value:'', onChange: changeFn, validator: validataorFn}))

    expect(result.current.value).toBe('')
    expect(typeof result.current.onChange).toBe('function')
    expect(result.current.validated).toBe(true)
    expect(result.current.errorMessages).toEqual([])
})

it("should update validation and form values correctly for name field", () => {
    const changedFn = jest.fn()
    const nameValidatorFn = jest.fn(nameValidator)
    const {result} = renderHook(() => useForm({value: '', onChange: changedFn, validator: nameValidatorFn, validated: false}))

    expect(result.current.value).toBe('')
    expect(typeof result.current.onChange).toBe('function')
    expect(result.current.validated).toBe(true)
    expect(result.current.errorMessages).toEqual([])

    act(() => {
        result.current.onChange('Ahmad')
    })

    expect(result.current.value).toBe('Ahmad')
    expect(result.current.validated).toBe(true)
    expect(nameValidatorFn).toHaveBeenCalledTimes(1)
    expect(changedFn).toHaveBeenCalledTimes(1)
    expect(result.current.errorMessages).toEqual([])

    act(() => {
        result.current.onChange('Mansor33')
    })

    expect(result.current.value).toBe('Mansor33')
    expect(result.current.validated).toBe(false)
    expect(changedFn).toHaveBeenCalledTimes(2)
    expect(result.current.errorMessages).toEqual(['Name field should only contain alphabets.'])
})

it("should update validation and form value for email field", () => {
    const changedFn = jest.fn()
    const emailValidatorFn = jest.fn(emailValidator)

    const {result} = renderHook(() => useForm({value:'', onChange: changedFn, validated: true, validator:emailValidatorFn}))

    act(() => {
        result.current.onChange('ali@icloud.com')
    })

    expect(result.current.value).toBe('ali@icloud.com')
    expect(result.current.validated).toBe(true)
    expect(result.current.errorMessages).toEqual([])

    act(() => {
        result.current.onChange('mohammad')
    })

    expect(result.current.value).toBe('mohammad')
    expect(result.current.validated).toBe(false)
    expect(result.current.errorMessages).toEqual(['Email field should have correct structure: you@example.com'])

    act(() => {
        result.current.onChange('')
    })

    expect(result.current.value).toBe('')
    expect(result.current.validated).toBe(false)
    expect(result.current.errorMessages).toEqual(['Email field is required'])
    expect(changedFn).toHaveBeenCalledTimes(3)
})