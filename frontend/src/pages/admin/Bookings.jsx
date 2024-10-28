import React from 'react'
import useBookings from '../../hooks/useBookings'
import { formatPostDate } from '../../utils/date'

const Bookings = () => {
    const { bookings, isLoading, isError } = useBookings()
    return (
        <div className="overflow-x-scroll sm:overflow-x-auto w-full">
            <table className="table bg-gray-100 text-base-100">
                {/* head */}
                <thead className='text-neutral'>
                    <tr>
                        <th>
                        </th>
                        <th>User</th>
                        <th>E-Mail</th>
                        <th>Booking Date</th>
                        <th>Price</th>
                        <th>Booking Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bookings && bookings.map((booking, i) => (
                            <tr key={booking._id} className='hover:bg-base-100 text-neutral transition-all duration-100'>
                                <th className='hover:bg-gray-100 transition-all duration-100'>
                                    {i + 1}
                                </th>
                                <td className='hover:bg-gray-100 transition-all duration-100'>
                                    {booking.user.fullName}
                                </td>
                                <td className='hover:bg-gray-100 transition-all duration-100'>
                                    {booking.user.email}
                                    <br />
                                </td>
                                <td className='hover:bg-gray-100 transition-all duration-100'>
                                    {formatPostDate(booking.createdAt)}
                                </td>
                                <th className='hover:bg-gray-100 transition-all duration-100'>
                                    {booking.destination.price}
                                </th>
                                <th className='hover:bg-gray-100 transition-all duration-100'>
                                    {booking.status}
                                </th>
                                <th className='text-primary hover:cursor-pointer hover:underline hover:bg-gray-100 transition-all duration-100'>
                                    Details
                                </th>
                            </tr>
                        ))
                    }
                </tbody>
                {/* foot */}
                <tfoot className='text-neutral'>
                    <tr>
                        <th>
                        </th>
                        <th>User</th>
                        <th>E-Mail</th>
                        <th>Booking Date</th>
                        <th>Price</th>
                        <th>Booking Status</th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default Bookings