import React, { useEffect, useState } from 'react';
import useBookings from '../../hooks/useBookings';
import Spinner from './Spinner';

const BookingsCount = ({ destinationId }) => {
    const { bookings, isLoading, isError } = useBookings();
    const [bookingsForDestination, setBookingsForDestination] = useState([]);

    useEffect(() => {
        if (bookings && destinationId) {
            const filteredBookings = bookings.filter((booking) => booking.destination._id === destinationId);
            setBookingsForDestination(filteredBookings);
        }
    }, [bookings, destinationId]);

    if (isLoading) return <Spinner size='sm' />;
    if (isError) return <p className="text-red">Error</p>;

    return (
        <div className="p-3 hover:shadow-lg transition-all duration-100">
            Bookings: <span className="text-accent">{bookingsForDestination.length || 0}</span>
        </div>
    );
};

export default BookingsCount;
