import React, {FunctionComponent, useContext, ChangeEvent} from 'react'

import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import {makeStyles} from '@material-ui/core/styles'

import SearchIcon from '@material-ui/icons/Search'

import {UsersContext} from '../../../../contexts/users'

const useSearchStyles = makeStyles(() => ({
    root: {
        width: '100%'
    }
}))

const SearchInput: FunctionComponent<{}> = () => {
    const {onSetSearchQuery, searchQuery} = useContext(UsersContext)

    const classes = useSearchStyles()

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        onSetSearchQuery && onSetSearchQuery(event.target.value)
    }

    const searchIconAdornment = 
        <InputAdornment
        position="start">
            <SearchIcon />
        </InputAdornment>
    
    return (
        <TextField
        className={classes.root}
        label="Search Users"
        variant="outlined"
        value={searchQuery}
        onChange={handleChange}
        InputProps={{
            startAdornment: searchIconAdornment
        }}
        placeholder="Example: Tracey Monroe"/>
    )
}

export default SearchInput