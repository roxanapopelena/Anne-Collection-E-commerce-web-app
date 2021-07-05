import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Loader from '../../../components/Loader'

const ValidateEntry = () => {
    const router = useRouter()
    const [error, setError] = useState('')

    useEffect(() => {
        async function validateOrder() {
            try {
                const response = await axios.post(`/api/checkout/validate-order`, { entry: router.query.entry })

                if (response.status === 200 && response.data.status === 200) {
                    router.replace('/cart/success')
                }

                if (response.status === 200 && response.data.status === 404) {
                    setError('Invalid entry.')
                }
            } catch (error) {
                console.error(error)
                setError('Something went wrong. Please try again later.')
            }
        }

        if (!router.isReady) {
            return
        }

        validateOrder()
    })

    if (error) {
        return <h1 style={{ color: 'red', marginTop: '8em' }}>{error}</h1>
    }

    return <Loader />
}

export default ValidateEntry