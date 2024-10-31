import React, { useEffect, useState } from 'react'
import useBookings from '../../hooks/useBookings'
import Spinner from './Spinner'

const BookingsCount = ({ destinationId }) => {
    const { bookings, isLoading, isError } = useBookings()
    const [bookignsForDestination, setBookignsForDestination] = useState([])
    if (isLoading) return <Spinner size='sm' />
    if (isError) return <p className="text-red">Error</p>
    useEffect(() => {
        const x = bookings.filter((booking) => booking.destination._id === destinationId)
        setBookignsForDestination(x)
    }, [destinationId])
    return (
        <div className="p-3 hover:shadow-lg transition-all duration-100">
            Bookings: <span className="text-accent">
                {bookignsForDestination?.length || 0}
            </span>
        </div>
    )
}

export default BookingsCount