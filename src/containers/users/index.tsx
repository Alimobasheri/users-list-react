import React, {FunctionComponent} from 'react'
import Container from '@material-ui/core/Container'

import {useFetch} from '../../hooks/useFetch'

import {fetchReturn} from '../../types'

const Users: FunctionComponent<{}> = () => {
    const {loading, data}: fetchReturn = useFetch()
    
    return (
        <Container
        component="main">
            <div>
                {!loading &&
                    data.data && Array.isArray(data.data) && 
                        data.data.map((item, idx) =>
                            <span key={idx}>{item.first_name}</span>
                        )
                }
            </div>
        </Container>
    )
}

export default Users