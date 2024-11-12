import React, { useEffect, useState } from 'react'
import useDestinations from '../../hooks/useDestinations'
import BentoDestinations from './BentoDestinations'

const Destinations = () => {
    const [search, setSearch] = useState('')
    const [filteredDestinations, setFilteredDestinations] = useState(null)
    const { destinations, isLoading, isError } = useDestinations()

    useEffect(() => {
    }, [search])

    const handleSubmit = (e) => {
        e.preventDefault();
        const filtered = destinations.filter(destination =>
            destination.name.toLowerCase().includes(search.toLowerCase()) ||
            destination.description.toLowerCase().includes(search.toLowerCase()) ||
            destination.location.toLowerCase().includes(search.toLowerCase()) ||
            destination.categories.some(category =>
                category.toLowerCase().includes(search.toLowerCase())
            )
        );
        setFilteredDestinations(filtered);
        console.log(filtered);
    };


    return (
        <div>
            <div className="flex flex-row w-full justify-around items-center">
                <div className="sm:w-1/4">
                    <form onSubmit={handleSubmit}>
                        <label className="input input-bordered flex items-center gap-2 border border-neutral text-primary">
                            <input
                                type="text"
                                name='search'
                                className="grow"
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Browse destinations"
                            />
                            <svg
                                type='submit'
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    fillRule="evenodd"
                                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                    clipRule="evenodd" />
                            </svg>
                        </label>
                    </form>
                </div>
            </div>
            <BentoDestinations destinations={filteredDestinations ? filteredDestinations : destinations} isError={isError} isLoading={isLoading} />
        </div>
    )
}

export default Destinations