import React, {FunctionComponent} from 'react'

import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import {makeStyles, useTheme} from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import {UsersProvider} from '../../contexts/users'

import UsersHeader from './components/users-header'
import UsersList from './components/users-list'

const useContainerStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
        width: '100%',
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            padding: 0
        }
    },
    wrapper: {
        width: '100%',
        padding: theme.spacing(4),
        maxWidth: 500,
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(1)
        }
    }
}))

const Users: FunctionComponent<{}> = () => {
    const classes = useContainerStyles()
    
    const theme = useTheme()
    const mediaQuery = useMediaQuery(theme.breakpoints.down('sm'))
    return (
        <UsersProvider>
            <Container
            className={classes.root}>
                <Grid
                className={classes.wrapper}
                container
                alignContent="stretch"
                justify="center"
                component={Paper}
                elevation={mediaQuery ? 0 : 8}>
                    <Grid
                    item
                    xs={12}>
                        <UsersHeader />
                    </Grid>
                    <Grid
                    item
                    xs={12}>
                        <UsersList />
                    </Grid>
                </Grid>
            </Container>
        </UsersProvider>
    )
}

export default Users