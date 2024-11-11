import React from 'react';

import { useNavigate } from 'react-router';
import useDestinations from '../../hooks/useDestinations.jsx';

const BentoDestinations = () => {
    const navigate = useNavigate()
    const { destinations, isLoading, isError } = useDestinations()
    if (!isLoading && !isError && destinations?.length < 1) return <div className="w-full h-[80dvh] text-center text-base-200">No destinations yet</div>


    return (
        <div className="sm:px-4 my-3">
            {isLoading && (
                <div className="columns-2 sm:columns-2 lg:columns-3 xl:columns-4 sm:gap-4 gap-2 space-y-4">
                    {/* Skeleton Loading */}
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex w-[14rem] flex-col gap-4 mx-auto">
                            <div className="skeleton h-48 w-full bg-accent"></div>
                            <div className="skeleton h-10 w-28 bg-accent"></div>
                            <div className="skeleton h-10 w-full bg-accent"></div>
                            <div className="skeleton h-10 w-full bg-accent"></div>
                        </div>
                    ))}
                </div>
            )}
            <div
                className="columns-2 sm:columns-2 lg:columns-3 xl:columns-4 sm:gap-4 gap-2 space-y-4"
            >
                {destinations?.map((destination, index) => (
                    <div
                        onClick={() => navigate(`/booking/${destination._id}`)}
                        key={index}
                        className="relative break-inside-avoid bg-gray-200 text-neutral rounded-lg sm:p-4 p-2 shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
                    >
                        {/* <img
                            src={destination.images[0]}
                            alt={destination.name}
                            className="w-full h-full rounded-lg mb-4 object-cover"
                        /> */}
                        <div className="carousel w-64">
                            {
                                destination.images && (
                                    destination.images.map((image, i) => (
                                        <div key={i} className="carousel-item w-full">
                                            <img
                                                src={image}
                                                className="w-full"
                                                alt={destination.name} />
                                        </div>
                                    ))
                                )
                            }
                        </div>
                        <h2 className="text-lg font-bold mb-2">{destination.name}</h2>
                        <p className="text-sm">{destination.description}</p>
                        {/* <button className="bg-gray-200 bg-opacity-[.6] text-base-100 my-3 rounded-md self-center p-1 absolute top-3 left-3 text-sm">Book now</button> */}
                    </div>
                ))
                }
            </div>
        </div>
    )
}

export default BentoDestinations;
