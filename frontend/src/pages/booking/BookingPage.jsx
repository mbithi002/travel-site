import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import useDestinations from '../../hooks/useDestinations'
import BookingHero from './BookingHero'

const BookingPage = () => {
    const { slug } = useParams()
    const { destinations, isLoading, isError } = useDestinations()
    const [destination, setDestination] = useState({})
    useEffect(() => {
        const x = destinations?.find((destination) => destination._id === slug)
        setDestination(x)
    }, [slug])
    if (isLoading) return <p>Loading...</p>

    return (
        <div>
            {destination?.name}
            <BookingHero />
        </div>
    )
}

export default BookingPage