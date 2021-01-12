import axios from 'axios'
import {useEffect, useState} from 'react'

export const useFetch = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})
    
    useEffect(() => {
        const API_HOST: string | null = process.env.REACT_APP_API_HOST || null

        if(API_HOST === null)
            return
        axios.get(API_HOST)
            .then(response => {
                setData(response.data)
                setLoading(false)
            })
            .catch(error => console.log(error))
    }, [])

    return {
            loading,
            data: data || {}
        } as const
}