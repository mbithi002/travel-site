import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import useDestinations from '../../hooks/useDestinations'
import { formatYearMonth } from '../../utils/date'

const BookingPage = () => {
    const { slug } = useParams()
    const { destinations, isLoading, isError } = useDestinations()
    const [destination, setDestination] = useState({})
    const [formData, setFormData] = useState({})

    useEffect(() => {
        const selectedDestination = destinations?.find((destination) => destination._id === slug)
        setDestination(selectedDestination)
    }, [slug, destinations])

    const getRatings = (arr) => {
        if (!arr) return
        let sum = arr.reduce((acc, rating) => acc + rating, 0)
        return `${sum === 0 ? 2 : sum} star rated`
    }

    if (isLoading) return <p>Loading...</p>

    return (
        <div>
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
                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <dialog id="book_now_modal" className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">Hello!</h3>
                                <p className="py-4">Press ESC key or click the button below to close</p>
                                <div className="modal-action">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn">Close</button>
                                    </form>
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
        </div>
    )
}

export default BookingPage
