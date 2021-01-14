import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import UserRow from './index'

const userData = JSON.parse('{"id":1,"email":"george.bluth@reqres.in","first_name":"George","last_name":"Bluth","avatar":"https://reqres.in/img/faces/1-image.jpg"}')

it('should check if row displays', () => {
    const {getByTestId} = render(<UserRow user={userData}/>)

    const row = getByTestId('row')

    const rowAvatar = getByTestId('rowAvatar')
    const avatarImage = getByTestId('avatarImage')

    const rowText = getByTestId('rowText')
    const primaryRowText = rowText.querySelector('.MuiListItemText-primary')
    const secondaryRowText = rowText.querySelector('.MuiListItemText-secondary')

    const editButton = getByTestId('editButton')
    const deleteButton = getByTestId('deleteButton')
    const editButtonIcon = editButton.querySelector('svg')
    const deleteButtonIcon = deleteButton.querySelector('svg')

    expect(row).toBeInTheDocument()

    expect(rowAvatar).toBeInTheDocument()

    expect(avatarImage).toHaveAttribute('src', userData.avatar)
    expect(avatarImage).toHaveStyle({
        height: 100,
        width: 100
    })

    expect(primaryRowText).toHaveTextContent(`${userData.first_name} ${userData.last_name}`)
    expect(secondaryRowText).toHaveTextContent(userData.email)

    expect(editButton).toBeInTheDocument()
    expect(deleteButton).toBeInTheDocument()
    expect(editButtonIcon).toHaveAttribute('color','blue')
    expect(deleteButtonIcon).toHaveAttribute('color','red')
})

it('should check if action buttons are disabled', () => {
    const {getByTestId} = render(<UserRow user={userData}/>)

    const editButton = getByTestId('editButton')
    const deleteButton = getByTestId('deleteButton')

    expect(editButton).toHaveAttribute('disabled', "")
    expect(deleteButton).toHaveAttribute('disabled', "")
})

it('should check if action buttons work.', () => {
    const onEditClick = jest.fn()
    const onDeleteClick = jest.fn()

    const {getByTestId} = render(<UserRow user={userData} onEdit={onEditClick} onDelete={onDeleteClick} />)

    const editButton = getByTestId('editButton')
    const deleteButton = getByTestId('deleteButton')

    expect(editButton).not.toHaveAttribute('disabled')
    expect(deleteButton).not.toHaveAttribute('disabled')

    fireEvent.click(editButton)
    fireEvent.click(deleteButton)

    expect(onEditClick).toHaveBeenCalledTimes(1)
    expect(onDeleteClick).toHaveBeenCalledTimes(1)
})