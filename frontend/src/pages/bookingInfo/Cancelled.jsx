import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import useBookings from '../../hooks/useBookings'
import { formatPostDate } from '../../utils/date'

const Cancelled = () => {
    const queryClient = useQueryClient()
    const { bookings, isLoading, isError } = useBookings()
    const { data: authUser } = useQuery({ queryKey: ['authUser'] })
    const [cancelledBookings, setCancelledBookings] = useState([])

    useEffect(() => {
        if (bookings, authUser) {
            const x = bookings.filter((booking) => booking.user._id === authUser._id && booking.status === 'cancelled')
            setCancelledBookings(x)
        }
    }, [bookings, authUser])

    const { mutate: deleteBooking, isPending, isError: errorDeletingBooking } = useMutation({
        mutationFn: async (id) => {
            const res = await fetch(`/api/booking/${id}`, {
                method: "DELETE"
            })
            const data = await res.json()
            if (!res.ok) {
                throw new Error(data.error) || 'something went wrong'
            }
            return data
        },
        onSuccess: () => {
            toast.success("Booking deleted")
            queryClient.invalidateQueries({ queryKey: ['bookings'] })
        },
        onError: () => {
            toast.error("Something went wrong")
        }
    })
    return (
        <>
            {
                cancelledBookings && (
                    <div className="flex flex-col items-center">
                        <h2 className="text-lg text-neutral">Cancelled Bookings</h2>
                        <div className="overflow-x-scroll">
                            <table className="table">
                                {/* head */}
                                <thead className='text-neutral'>
                                    <tr>
                                        <th></th>
                                        <th>Destination</th>
                                        <th>Adults</th>
                                        <th>Children</th>
                                        <th>Location</th>
                                        <th>Price</th>
                                        <th>PaymentStatus</th>
                                        <th>Status</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    {
                                        cancelledBookings && cancelledBookings.map((booking, i) => (
                                            <tr key={i} className={`bg-base-100 text-neutral`}>
                                                <th>{i + 1}</th>
                                                <td>{booking.destination.name}</td>
                                                <td>{booking.adults}</td>
                                                <td>{booking.children}</td>
                                                <td>{booking.destination.location}</td>
                                                <td>{booking.destination.price}</td>
                                                <td>{booking.paymentStatus}</td>
                                                <td className='text-red-500 font-semibold'>{booking.status}</td>
                                                <td>{formatPostDate(booking.createdAt)}</td>
                                                <td onClick={() => deleteBooking(booking._id)} className='cursor-pointer text-red-500 font-semibold'>Delete</td>
                                            </tr>
                                        )
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Cancelled