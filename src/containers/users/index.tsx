import React, {FunctionComponent} from 'react'
import Container from '@material-ui/core/Container'
import {makeStyles} from '@material-ui/core/styles'

import UsersList from './components/users-list'

import {useFetch} from '../../hooks/useFetch'

import {fetchReturn} from '../../types'

const useContainerStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
}))

const Users: FunctionComponent<{}> = () => {
    const {loading, data}: fetchReturn = useFetch()

    const classes = useContainerStyles()
    
    return (
        <Container
        className={classes.root}
        component="main">
            <div>
                {!loading &&
                    data.data && Array.isArray(data.data) && 
                        <UsersList
                        users={data.data} />
                }
            </div>
        </Container>
    )
}

export default Users