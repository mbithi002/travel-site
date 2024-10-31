import React from 'react';

import { useNavigate } from 'react-router';
import useDestinations from '../../hooks/useDestinations.jsx';
import { DESTINATIONS } from './data/DESTINATIONS.js';

const BentoDestinations = () => {
    const navigate = useNavigate()
    const { destinations, isLoading, isError } = useDestinations()

    return (
        <div className="px-4">
            {isLoading && (
                <div className="grid sm:grid-cols-4 p-5 gap-5">
                    <div className="flex w-[14rem] flex-col gap-4 mx-auto">
                        <div className="skeleton h-48 w-full bg-accent"></div>
                        <div className="skeleton h-10 w-28 bg-accent"></div>
                        <div className="skeleton h-10 w-full bg-accent"></div>
                        <div className="skeleton h-10 w-full bg-accent"></div>
                    </div>
                    <div className="flex w-[14rem] flex-col gap-4 mx-auto">
                        <div className="skeleton h-48 w-full bg-accent"></div>
                        <div className="skeleton h-10 w-28 bg-accent"></div>
                        <div className="skeleton h-10 w-full bg-accent"></div>
                        <div className="skeleton h-10 w-full bg-accent"></div>
                    </div>
                    <div className="flex w-[14rem] flex-col gap-4 mx-auto">
                        <div className="skeleton h-48 w-full bg-accent"></div>
                        <div className="skeleton h-10 w-28 bg-accent"></div>
                        <div className="skeleton h-10 w-full bg-accent"></div>
                        <div className="skeleton h-10 w-full bg-accent"></div>
                    </div>
                    <div className="flex w-[14rem] flex-col gap-4 mx-auto">
                        <div className="skeleton h-48 w-full bg-accent"></div>
                        <div className="skeleton h-10 w-28 bg-accent"></div>
                        <div className="skeleton h-10 w-full bg-accent"></div>
                        <div className="skeleton h-10 w-full bg-accent"></div>
                    </div>
                </div>
            )}
            <div
                className="columns-2 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
            >
                {
                    !isLoading && !isError && DESTINATIONS.map((des) => {
                        return destinations.map((destination, index) => (
                            <div
                                onClick={() => navigate(`/booking/${destination._id}`)}
                                key={index}
                                className="relative break-inside-avoid bg-gray-200 text-neutral rounded-lg p-4 shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
                            >
                                <img
                                    src={des.images[0]}
                                    alt={destination.name}
                                    className="w-full h-auto rounded-lg mb-4 object-cover"
                                />
                                <h2 className="text-lg font-bold mb-2">{destination.name}</h2>
                                <p className="text-sm">{destination.description}</p>
                                {/* <button className="bg-gray-200 bg-opacity-[.6] text-base-100 my-3 rounded-md self-center p-1 absolute top-3 left-3 text-sm">Book now</button> */}
                            </div>
                        ))
                    }
                    )
                }
            </div>
        </div>
    )
}

export default BentoDestinations;
