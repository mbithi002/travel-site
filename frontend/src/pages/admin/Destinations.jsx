import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { formatPostDate } from '../../utils/date/index.js'

const Destinations = () => {
    const { data: destinations } = useQuery({ queryKey: ['destinations'] })
    return (
        <div>
            <div className="overflow-x-scroll sm:overflow-x-auto w-full">
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
                                <tr className='hover:bg-base-100 text-neutral transition-all duration-100'>
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
                                    <th className='hover:bg-gray-100 transition-all duration-100'>
                                        <div className="text-primary">
                                            <button className="m-0 p-0 btn btn-square btn-ghost">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    className="inline-block size-4 stroke-current">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                                                </svg>
                                            </button>
                                        </div>
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