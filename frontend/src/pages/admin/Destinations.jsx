import React from 'react'
import useDestinations from '../../hooks/useDestinations.jsx'
import { formatPostDate } from '../../utils/date/index.js'

const Destinations = () => {
    const { destinations, isLoading, isError } = useDestinations()
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
                            <th>Images</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>createdAt</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            destinations && destinations.map((destination, i) => (
                                <tr key={destination._id} className='hover:bg-base-100 text-neutral transition-all duration-100'>
                                    <th className='hover:bg-gray-100 transition-all duration-100'>
                                        {i + 1}
                                    </th>
                                    <td className='hover:bg-gray-100 transition-all duration-100'>
                                        {destination.name}
                                    </td>
                                    <td className='hover:bg-gray-100 transition-all duration-100'>
                                        {destination.name}
                                    </td>
                                    <td className='hover:bg-gray-100 transition-all duration-100'>
                                        {destination.price}
                                    </td>
                                    <th className='hover:bg-gray-100 transition-all duration-100'>
                                        {formatPostDate(destination.createdAt)}
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
                            <th>Images</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>createdAt</th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default Destinations