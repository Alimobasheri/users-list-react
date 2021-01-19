import React, {FunctionComponent, useContext, ChangeEvent, MouseEvent} from 'react'

import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'

import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import {UsersContext} from '../../../../contexts/users'

const SelectSort: FunctionComponent<{}> = () => {
    const {sort_key, onSortUsers, ascending} = useContext(UsersContext)

    const handleChange = (event: ChangeEvent<{value: unknown}>) => {
        event.preventDefault()
        onSortUsers && onSortUsers(event.target.value, ascending)
    }

    const handleArrowClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        onSortUsers && onSortUsers(sort_key, !ascending)
    }
    return (
        <Grid
        direction="row"
        container
        spacing={1}
        alignItems="center">
            <Grid
            item>
                <InputLabel
                id="usersSortSelect">
                    Sort Users By:
                </InputLabel>
            </Grid>
            <Grid
            item>
                <Select
                labelId="usersSortSelect"
                value={sort_key}
                onChange={handleChange}>
                    <MenuItem value={'id'}>ID</MenuItem>
                    <MenuItem value={'first_name'}>First Name</MenuItem>
                    <MenuItem value={'last_name'}>Last Name</MenuItem>
                    <MenuItem value={'email'}>Email</MenuItem>
                </Select>
            </Grid>
            <Grid
            item>
                <IconButton
                onClick={handleArrowClick}
                size={'small'}>
                    {
                        ascending ?
                            <KeyboardArrowUpIcon /> :
                            <KeyboardArrowDownIcon />
                    }
                </IconButton>
            </Grid>
        </Grid>
    )
}

export default SelectSort