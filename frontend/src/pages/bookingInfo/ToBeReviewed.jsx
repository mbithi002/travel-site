import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import useBookings from '../../hooks/useBookings'
import useReviews from '../../hooks/useReviews'
import { formatPostDate } from '../../utils/date/index'

const ToBeReviewed = () => {
    const queryClient = useQueryClient()
    const { reviews, isLoading, isError } = useReviews()
    const { bookings, isLoading: lloadingBookings, isError: errorBookings } = useBookings()
    const { data: authUser } = useQuery({ queryKey: ['authUser'] })
    const [toBeReviewed, setToBeReviewed] = useState([])
    const [formData, setFormData] = useState({
        user: '',
        destination: '',
        rating: 0,
        comment: '',
        booking: ''
    })

    // Mutation to create a review
    const { mutate: createReview, isLoading: isSubmitting } = useMutation({
        mutationFn: async (formData) => {
            try {
                const res = await fetch("/api/review/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData)
                })
                const data = await res.json()
                if (!res.ok) {
                    throw new Error(data.error) || 'something went wrong'
                }
                return data
            } catch (error) {
                throw new Error(error)
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['reviews', 'bookings'])
            setFormData({
                user: authUser._id,
                destination: '',
                rating: 0,
                comment: '',
                booking: ''
            })
            document.getElementById('review_modal').close()
            toast.success("Review created")
        },
        onError: (error) => {
            toast.error('Something went wrong')
        }
    })

    useEffect(() => {
        const isReviewed = (bookingId) => {
            return reviews.some((review) => review.booking === bookingId)
        }
        if (authUser && reviews && bookings) {
            const filteredBookings = bookings.filter((booking) =>
                booking.user._id === authUser._id && !isReviewed(booking._id)
            )
            setToBeReviewed(filteredBookings)
            setFormData({
                user: authUser._id,
                destination: '',
                rating: 0,
                comment: '',
                booking: ''
            })
        }
    }, [authUser, reviews, bookings])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formData.comment && formData.rating > 0) {
            createReview(formData)
        }
        setFormData({
            user: authUser._id,
            destination: '',
            rating: 0,
            comment: '',
            booking: ''
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    if (isLoading) {
        return <div className="skeleton h-[75dvh] my-3 w-full bg-gray-300"></div>
    }
    if (isError) {
        return <div className="h-[75dvh] my-3 w-full text-red-500 text-center flex items-center justify-center">
            <p className="">Something went wrong😢😢</p>
        </div>
    }
    if (!isLoading && !isError && toBeReviewed?.length < 1) return <div className="w-full h-full text-center text-base-200">No bookings to be reviewed yet</div>

    return (
        <>
            {toBeReviewed && (
                <div className="flex flex-col items-center overflow-x-scroll w-full my-2">
                    <h2 className="text-lg text-neutral">Bookings to be Reviewed</h2>
                    <div className="overflow-x-scroll">
                        <table className="table w-full sm:text-md text-xs">
                            <thead className="text-neutral">
                                <tr>
                                    <th></th>
                                    <th>Destination</th>
                                    <th>Location</th>
                                    <th>Price</th>
                                    <th>Booking Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {toBeReviewed.map((booking, i) => (
                                    <tr key={i} className="bg-base-100 text-neutral">
                                        <th>{i + 1}</th>
                                        <td>{booking.destination.name}</td>
                                        <td>{booking.destination.location}</td>
                                        <td>{booking.destination.price}</td>
                                        <td>{formatPostDate(booking.createdAt)}</td>
                                        <td>
                                            <button
                                                onClick={() => {
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        booking: booking._id,
                                                        destination: booking.destination._id
                                                    }))
                                                    document.getElementById('review_modal').showModal()
                                                }}
                                                className="cursor-pointer text-blue-500 font-semibold"
                                            >
                                                Review
                                            </button>
                                            <dialog id="review_modal" className="modal">
                                                <div className="modal-box">
                                                    <h3 className="font-bold text-lg text-center">Create a Review</h3>
                                                    <form onSubmit={handleSubmit} className="w-full h-full flex flex-col">
                                                        <label htmlFor="comment">Write a Comment</label>
                                                        <input
                                                            type="text"
                                                            name="comment"
                                                            value={formData.comment}
                                                            onChange={handleChange}
                                                            placeholder="Type here"
                                                            className="input w-full max-w-xs"
                                                        />
                                                        <label htmlFor="rating">Give a Star Rating</label>
                                                        <input
                                                            type="number"
                                                            name="rating"
                                                            value={formData.rating}
                                                            onChange={handleChange}
                                                            max={5}
                                                            min={0}
                                                            className="input w-full max-w-xs"
                                                        />
                                                        <button
                                                            type="submit"
                                                            className="btn btn-primary text-base-100 w-full my-2"
                                                            disabled={isSubmitting}
                                                        >
                                                            {isSubmitting ? 'Submitting...' : 'Submit'}
                                                        </button>
                                                    </form>
                                                    <div className="modal-action">
                                                        <button
                                                            type="button"
                                                            onClick={() => document.getElementById('review_modal').close()}
                                                            className="btn"
                                                        >
                                                            Close
                                                        </button>
                                                    </div>
                                                </div>
                                            </dialog>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    )
}

export default ToBeReviewed
