import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Spinner from '../../components/common/Spinner';

import { DESTINATIONS } from './data/DESTINATIONS.js';

const BentoDestinations = () => {

    const { data: destinations, isLoading, isError } = useQuery({
        queryKey: ['destinations'],
        queryFn: async () => {
            try {
                const res = await fetch('/api/destinations', { method: 'GET' })
                const data = await res.json()
                if (!res.ok) {
                    throw new Error(data.error) || 'something went wrong'
                }

                return data
            } catch (error) {
                console.log(error.message);
            }
        },
    })
    console.log(destinations);


    return (
        <div className="px-4">
            <div
                className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
            >
                {isLoading && (
                    <div className="w-full h-screen"><Spinner size='lg' /></div>
                )}
                {
                    !isLoading && !isError && DESTINATIONS.map((des) => {
                        return destinations.map((destination, index) => (
                            <div
                                key={index}
                                className="break-inside-avoid bg-gray-200 text-neutral rounded-lg p-4 shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
                            >
                                <img
                                    src={des.images[0]}
                                    alt={destination.name}
                                    className="w-full h-auto rounded-lg mb-4 object-cover"
                                />
                                <h2 className="text-lg font-bold mb-2">{destination.name}</h2>
                                <p className="text-sm">{destination.description}</p>
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
