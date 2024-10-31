import React from 'react';
import HomeImage from '../../assets/images/home/resort.jpg';
import BookingsCount from '../../components/common/BookingsCount.jsx';
import useDestinations from '../../hooks/useDestinations.jsx';
import { formatPostDate } from '../../utils/date/index.js';

const Destinations = () => {
    const { destinations, isLoading, isError } = useDestinations();

    if (isLoading) {
        return <div className="skeleton h-[75dvh] my-3 w-full bg-gray-300"></div>;
    }
    if (isError) {
        return <div className="h-[75dvh] my-3 w-full text-red-500 text-center flex items-center justify-center">
            <p className="">Something went wrong😢😢</p>
        </div>;
    }

    return (
        <div>
            <div className="overflow-x-scroll sm:overflow-x-auto w-full min-h-[75dvh]">
                <table className="table bg-gray-100 text-base-100">
                    {/* head */}
                    <thead className='text-neutral'>
                        <tr>
                            <th></th>
                            <th>Images</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Created At</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {destinations && destinations.map((destination, i) => {
                            return (
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
                                        <button
                                            className=""
                                            onClick={() => document.getElementById(`${destination._id}`).showModal()}
                                        >
                                            Details
                                        </button>
                                        <dialog id={`${destination._id}`} className="modal">
                                            <div className="modal-box w-11/12 max-w-5xl h-[90dvh]">
                                                <form>
                                                    <label className="w-full text-center">
                                                        {destination?.name || "Destination Name"}
                                                    </label>
                                                    <div className="grid sm:grid-cols-2 gap-4 p-5">
                                                        <div>
                                                            <img
                                                                src={HomeImage}
                                                                alt="Travel Destination"
                                                                className="object-cover w-full h-[60dvh]"
                                                            />
                                                        </div>
                                                        <div className="flex flex-col justify-start align-top">
                                                            <div className="p-3 hover:shadow-lg transition-all duration-100">
                                                                <p className="text-primary">Location</p>
                                                                <p className="text-neutral">{destination?.location}</p>
                                                            </div>
                                                            <hr />
                                                            <div className="p-3 hover:shadow-lg transition-all duration-100">
                                                                <p className="text-primary">Categories</p>
                                                                {destination.categories?.map((category, index) => (
                                                                    <p key={index} className="text-accent text-sm">{category}</p>
                                                                ))}
                                                            </div>
                                                            <hr />
                                                            <div className="p-3 hover:shadow-lg transition-all duration-100">
                                                                {destination.availability ? <p className="text-primary">Available</p> : <p className="text-red-400">Unavailable</p>}
                                                            </div>
                                                            <hr />
                                                            <div className="p-3 hover:shadow-lg transition-all duration-100">
                                                                Price: Ksh <span className="text-accent">{destination.price}</span>
                                                            </div>
                                                            <hr />
                                                            <BookingsCount destinationId={destination._id} />
                                                        </div>
                                                    </div>
                                                </form>
                                                <div className="modal-action">
                                                    <form method="dialog">
                                                        <button className="btn">Close</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </dialog>
                                    </th>
                                </tr>
                            );
                        })}
                    </tbody>
                    {/* foot */}
                    <tfoot className='text-neutral'>
                        <tr>
                            <th></th>
                            <th>Images</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Created At</th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default Destinations;
