import React from 'react'
import useBookings from '../../hooks/useBookings'
import { formatPostDate } from '../../utils/date'

const Bookings = () => {
    const { bookings, isLoading, isError } = useBookings()
    if (isLoading) {
        return <div className="skeleton h-[75dvh] my-3 w-full bg-gray-300"></div>
    }
    if (isError) {
        return <div className="h-[75dvh] my-3 w-full text-red-500 text-center flex items-center justify-center">
            <p className="">Something went wrong😢😢</p>
        </div>
    }
    return (
        < div >
            <div className="overflow-x-scroll sm:overflow-x-auto w-full min-h-[75dvh]">
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
        </div>
    )
}

export default Bookings