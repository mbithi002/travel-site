import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import useBookings from '../../hooks/useBookings'
import { formatPostDate } from '../../utils/date'

const Bookings = () => {
    const queryClient = useQueryClient()
    const { data: authUser } = useQuery({ queryKey: ['authUser'] })
    const { bookings, isError, isLoading } = useBookings()
    const [myBookings, setMyBookings] = useState([])
    useEffect(() => {
        if (authUser && bookings) {
            const x = bookings.filter((booking) => booking.user._id === authUser._id && booking.status !== 'cancelled')
            setMyBookings(x)
        }
    }, [bookings, authUser])


    const { mutate: cancelBooking, isPending, isError: errorCancellingBooking } = useMutation({
        mutationFn: async (id) => {
            try {
                const res = await fetch(`/api/booking/cancel/${id}`, {
                    method: "PUT"
                })
                const data = await res.json()
                if (!res.ok) {
                    throw new Error(data.message)
                }
                return data
            } catch (error) {
                throw new Error(error)
            }
        },
        onSuccess: () => {
            toast.success("Booking cancelled")
            queryClient.invalidateQueries({ queryKey: ['bookings'] })
        },
        onError: (error) => {
            toast.error("Something went wrong")
        }
    })

    return (
        <>
            {
                myBookings && (
                    <div className="flex flex-col items-center">
                        <h2 className="text-lg text-neutral">My Bokings</h2>
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
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    {
                                        myBookings && myBookings.map((booking, i) => (
                                            <tr key={i} className={`bg-base-100 text-neutral`}>
                                                <th>{i + 1}</th>
                                                <td>{booking.destination.name}</td>
                                                <td>{booking.adults}</td>
                                                <td>{booking.children}</td>
                                                <td>{booking.destination.location}</td>
                                                <td>{booking.destination.price}</td>
                                                <td>{booking.paymentStatus}</td>
                                                <td>{formatPostDate(booking.createdAt)}</td>
                                                {
                                                    booking.paymentStatus === 'pending' ? (
                                                        <td className="text-primary font-semibold">Pay Now</td>
                                                    ) : (
                                                        <td></td>
                                                    )
                                                }
                                                {
                                                    booking.status === 'cancelled' ? (
                                                        <td className="text-red-500 font-semibold">Cancelled</td>
                                                    ) : (
                                                        <td onClick={() => cancelBooking(booking._id)} className="cursor-pointer text-red-500 font-semibold">Cancel</td>
                                                    )
                                                }
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

export default Bookings