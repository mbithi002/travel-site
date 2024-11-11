import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useParams } from 'react-router'
import useDestinations from '../../hooks/useDestinations'
import { formatYearMonth } from '../../utils/date'
import { validateAndFormatPhoneNumber } from '../../utils/phone'

const BookingPage = () => {
    const { slug } = useParams()
    const queryClient = useQueryClient()
    const { destinations, isLoading, isError } = useDestinations()
    const [destination, setDestination] = useState({})
    const { data: authUser, isLoading: queryingUser } = useQuery({ queryKey: ['authUser'] })
    const [formData, setFormData] = useState({
        user: '',
        destination: '',
        adults: 0,
        children: 0,
        phone: ''
    })
    const [formError, setFormError] = useState('')

    useEffect(() => {
        const selectedDestination = destinations?.find((dest) => dest._id === slug)
        setDestination(selectedDestination)
        if (authUser && destination) {
            setFormData({
                user: authUser._id,
                destination: destination._id,
                adults: 1,
                children: 0,
                phone: ''
            })
        }
    }, [slug, destinations, authUser])

    const { mutate: createBooking } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch('/api/booking/', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData)
                })
                const data = await res.json()
                if (!res.ok) {
                    throw new Error(data.message || 'Something went wrong')
                }
                return data
            } catch (error) {
                throw new Error(error.message)
            }
        },
        onSuccess: () => {
            toast.success("Booking created successfully")
            document.getElementById('book_now_modal').close()
            queryClient.invalidateQueries({ queryKey: 'bookings' })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        if (queryingUser || isLoading) return
        setFormError('')

        if (formData.adults > 10) {
            setFormError('Maximum adults is 10')
            return
        }
        if (formData.children > 5) {
            setFormError('Maximum children is 5')
            return
        }

        const phoneNumber = validateAndFormatPhoneNumber(formData.phone)

        if (!phoneNumber) {
            setFormError('Please enter a valid phone number')
            return
        }
        formData.user = authUser._id
        formData.destination = destination._id
        setFormData((prevData) => ({ ...prevData, phone: phoneNumber, }))

        createBooking()
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const getRatings = (arr) => {
        if (!arr) return
        const sum = arr.reduce((acc, rating) => acc + rating, 0)
        return `${sum === 0 ? 2 : sum} star rated`
    }

    if (isLoading) return <p>Loading...</p>

    return (
        <div>
            {
                destination && (
                    <div className="grid sm:grid-cols-12 gap-3 sm:min-h-[90dvh] min-h-screen w-full p-2">
                        <div className="col-span-3 shadow-sm p-2">
                            <div className="text-primary flex flex-col items-start space-y-3">
                                <div className="text-lg font-semibold">Destination</div>
                                <h3 className="text-neutral text-center font-semibold italic">{destination.name}</h3>
                                <hr />
                                <div className="text-lg font-semibold">Description</div>
                                <p className="text-neutral text-start italic">{destination.description}</p>
                                <div className="text-lg font-semibold">Dated for:</div>
                                <p className="text-neutral italic">
                                    {destination.date ? formatYearMonth(destination.date) : 'To be Determined'}
                                </p>
                                <div className="text-lg font-semibold">Location:</div>
                                <p className="text-neutral italic">{destination.location}</p>
                                <div className="text-lg font-semibold">Categories / Activities:</div>
                                {destination.categories?.map((category, i) => (
                                    <p key={i} className="text-neutral italic">{category}</p>
                                ))}
                                <div className="text-lg font-semibold">Price:</div>
                                <p className="text-neutral italic">Ksh: {destination.price}</p>
                                <p className="text-neutral italic">
                                    {destination.availability ? 'Available for booking' : 'Currently Unavailable'}
                                </p>
                                <p className="text-neutral italic">{getRatings(destination.ratings)}</p>
                            </div>
                        </div>

                        <div className="col-span-5 h-full">
                            <h2 className="text-center font-bold text-neutral italic text-lg">Book Destination Now!</h2>
                            <div className="flex flex-col space-y-4 items-start text-neutral my-3 p-2 rounded-md h-full">
                                <p className="font-semibold mb-3">Payment Procedure</p>
                                <p className="text-green-500 text-md">M-Pesa payment</p>
                                <div className="text-sm text-start p-2 flex flex-col justify-between gap-4 w-full">
                                    <p>Lipa na M-Pesa</p>
                                    <hr />
                                    <p>M-Pesa Business Number: <strong>XXX-XXX</strong></p>
                                    <hr />
                                    <p>M-Pesa Paybill: <strong>XXX-XXX</strong></p>
                                    <hr />
                                    <p>Enter Amount: <strong>{destination.price}</strong></p>
                                    <hr />
                                    <p>Enter Your PIN and confirm</p>
                                    <hr />
                                </div>
                                <button onClick={() => document.getElementById('book_now_modal').showModal()} className="btn btn-accent w-full text-base-100 mt-auto">Book Now!</button>
                                <dialog id="book_now_modal" className="modal">
                                    <div className="modal-box">
                                        <h3 className="font-bold text-lg">Fill the fields below</h3>
                                        {
                                            formError && (
                                                <p className="text-center text-red-500">{formError}</p>
                                            )
                                        }
                                        <form onSubmit={handleSubmit} className='w-full flex flex-col items-start'>
                                            <label>M-Pesa phone number</label>
                                            <input
                                                type="tel"
                                                name='phone'
                                                maxLength={10}
                                                onChange={handleChange}
                                                placeholder="Enter phone..."
                                                className="input input-bordered border-accent my-2 w-full"
                                            />
                                            <label>Adults</label>
                                            <input
                                                type="number"
                                                name='adults'
                                                value={formData.adults}
                                                max={10}
                                                min={1}
                                                onChange={handleChange}
                                                placeholder="Enter..."
                                                className="input input-bordered border-accent my-2 w-full"
                                            />
                                            <label>Children</label>
                                            <input
                                                type="number"
                                                name='children'
                                                value={formData.children}
                                                max={5}
                                                min={0}
                                                onChange={handleChange}
                                                placeholder="Enter..."
                                                className="input input-bordered border-accent my-2 w-full"
                                            />
                                            <button className="btn btn-primary text-white my-2 w-full" type='submit'>Submit</button>
                                        </form>
                                        <div className="modal-action w-full">
                                            {/* <form method="dialog w-full"> */}
                                            <button onClick={() => document.getElementById('book_now_modal').close()} className="btn bg-red-500 w-full">Cancel</button>
                                            {/* </form> */}
                                        </div>
                                    </div>
                                </dialog>
                            </div>
                        </div>

                        <div className="col-span-4 shadow-sm p-2">
                            <div className="flex flex-col w-full">
                                <div className="carousel w-full">
                                    {destination.images?.map((image, i) => (
                                        <div key={i} className="carousel-item w-full">
                                            <img src={image} className="w-full" alt={destination.name} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default BookingPage
