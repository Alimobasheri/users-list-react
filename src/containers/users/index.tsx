import React, {FunctionComponent} from 'react'
import Container from '@material-ui/core/Container'
import {makeStyles} from '@material-ui/core/styles'

import {UsersProvider} from '../../contexts/users'

import UsersList from './components/users-list'

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
    const classes = useContainerStyles()
    
    return (
        <UsersProvider>
            <Container
            className={classes.root}
            component="main">
                <div>
                    <UsersList/>
                </div>
            </Container>
        </UsersProvider>
    )
}

export default Users