import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import HomeImage from '../../assets/images/home/resort.jpg';
import BookingsCount from '../../components/common/BookingsCount.jsx';
import useDestinations from '../../hooks/useDestinations.jsx';
import { formatPostDate } from '../../utils/date/index.js';

const Destinations = () => {
    const { destinations, isLoading, isError } = useDestinations();
    const queryClient = useQueryClient()
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        location: '',
        categories: []
    });

    const { mutate: updateDestination } = useMutation({
        mutationFn: async (destinationId) => {
            try {
                const res = await fetch(`/api/destinations/${destinationId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error) || 'Something went wrong';
                return data;
            } catch (error) {
                throw new Error(error);
            }
        },
        onSuccess: () => {
            toast.success("Destination updated successfully");
            queryClient.invalidateQueries(['destinations']);
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (destinationId) => {
        updateDestination(destinationId);
        document.getElementById(`${destinationId}`).close(); // Close modal after updating
    };
    if (!isLoading && !isError && destinations?.length < 1) return <div className="w-full h-full text-center text-base-200">No destinations yet, click the three dots on the top right corner and select add a destination</div>

    if (isLoading) {
        return <div className="skeleton h-[75dvh] my-3 w-full bg-gray-300"></div>;
    }
    if (isError) {
        return <div className="h-[75dvh] my-3 w-full text-red-500 text-center flex items-center justify-center">
            <p>Something went wrong😢😢</p>
        </div>;
    }

    return (
        <div>
            <div className="overflow-x-scroll sm:overflow-x-auto w-full min-h-[75dvh]">
                <table className="table bg-gray-100 text-base-100">
                    <thead className='text-neutral'>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Price</th>
                            <th>Created At</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {destinations && destinations.map((destination, i) => (
                            <tr key={destination._id} className='hover:bg-base-100 text-neutral transition-all duration-100'>
                                <th className='hover:bg-gray-100 transition-all duration-100'>
                                    {i + 1}
                                </th>
                                <td className='hover:bg-gray-100 transition-all duration-100'>
                                    {destination.name}
                                </td>
                                <td className='hover:bg-gray-100 transition-all duration-100'>
                                    {destination.location}
                                </td>
                                <td className='hover:bg-gray-100 transition-all duration-100'>
                                    {destination.price}
                                </td>
                                <th className='hover:bg-gray-100 transition-all duration-100'>
                                    {formatPostDate(destination.createdAt)}
                                </th>
                                <th className='text-primary hover:cursor-pointer hover:underline hover:bg-gray-100 transition-all duration-100'>
                                    <button
                                        onClick={() => {
                                            setFormData({
                                                name: destination.name,
                                                price: destination.price,
                                                location: destination.location,
                                                categories: destination.categories || []
                                            });
                                            document.getElementById(`${destination._id}`).showModal();
                                        }}
                                    >
                                        Details
                                    </button>
                                    <dialog id={`${destination._id}`} className="modal">
                                        <div className="modal-box w-11/12 max-w-5xl h-[90dvh]">
                                            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(destination._id); }}>
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
                                                        <div className="p-1 hover:shadow-lg transition-all duration-100">
                                                            <p className="text-primary">Location</p>
                                                            <input
                                                                type="text"
                                                                name="location"
                                                                value={formData.location}
                                                                onChange={handleInputChange}
                                                                className="input input-bordered w-full text-neutral"
                                                            />
                                                        </div>
                                                        <hr />
                                                        <div className="p-1 hover:shadow-lg transition-all duration-100">
                                                            <p className="text-primary">Categories</p>
                                                            {/* <input
                                                                type="text"
                                                                onChange={(e) => handleCategoryChange(e)}
                                                                placeholder="Add category"
                                                                className="input input-bordered w-full placeholder:text-sm text-neutral"
                                                            /> */}
                                                            {formData.categories.map((category, index) => (
                                                                <p key={index} className="text-sm text-neutral">{category}</p>
                                                            ))}
                                                        </div>
                                                        <hr />
                                                        <div className="p-1 hover:shadow-lg transition-all duration-100">
                                                            <p className="text-primary">Price</p>
                                                            <input
                                                                type="number"
                                                                name="price"
                                                                value={formData.price}
                                                                onChange={handleInputChange}
                                                                className="input input-bordered w-full text-neutral"
                                                            />
                                                        </div>
                                                        <hr />
                                                        <div className="flex flex-row justify-center items-center">
                                                            <BookingsCount destinationId={destination._id} />
                                                            <div className="text-neutral flex flex-row items-center">
                                                                <p className="m-2">Available</p>
                                                                <input type="checkbox" defaultChecked className="checkbox bg-primary" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="modal-action">
                                                    <button type="submit" className="btn text-base-100 hover:btn-primary transition-all duration-100">Update Destination</button>
                                                    <form method="dialog">
                                                        <button className="btn">Close</button>
                                                    </form>
                                                </div>
                                            </form>
                                        </div>
                                    </dialog>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                    {/* foot */}
                    <tfoot className='text-neutral'>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Location</th>
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
