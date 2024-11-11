import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Spinner from '../../../components/common/Spinner';

const CreateDestinationModal = () => {
    const queryClient = useQueryClient()
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        images: [''],
        location: '',
        categories: '',
        price: '',
        availability: true,
        ratings: [0]
    });

    const { mutate: createDestination, isPending, isError } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch('/api/destinations/', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                })
                const data = await res.json()
                if (!res.ok) {
                    throw new Error(data.error) || "something went wrong"
                }
                return data
            } catch (error) {
                throw new Error(error)
            }
        },
        onSuccess: () => {
            toast.success("Destination created successfully!")
            queryClient.invalidateQueries({ queryKey: ['destinations'] })
        },
        onError: (error) => {
            toast.error(error.message) || toast.error('Failed to create destination')
        }
    })

    const handleCancel = () => {
        setFormData({
            name: '',
            description: '',
            images: [''],
            location: '',
            categories: '',
            price: '',
            availability: true,
            ratings: [0]
        })
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const imagePromises = files.map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        Promise.all(imagePromises)
            .then(images => setFormData(prev => ({ ...prev, images })))
            .catch(error => console.error("Error loading images:", error));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.desctirption || !formData.images || !formData.location || !formData.price) {
            toast.error('Please fill in relevant fields')
            return
        }
        createDestination()
        console.log(formData);
        document.getElementById('create_destination_modal').close();
    };

    if (isPending) return <Spinner size='xl' />
    // if (isError) return <div className="text-red-500 w-full h-full text-center">Oops, something went wrong😢😢</div>

    return (
        <div>
            <dialog id="create_destination_modal" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">Create New Destination</h3>
                    <form onSubmit={handleSubmit} className="py-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="mb-4 flex flex-col items-start gap-2">
                                <label className='text-md font-bold'>Destination name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter destination"
                                    className="input input-bordered input-info w-full"
                                />
                                <label className='text-md font-bold'>Description</label>
                                <input
                                    type="text"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Enter description"
                                    className="input input-bordered input-info w-full"
                                />
                                <label className='text-md font-bold'>Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="Enter location"
                                    className="input input-bordered input-info w-full"
                                />
                                <div className="w-full flex flex-row items-start justify-between">
                                    <div className="flex flex-col gap-2">
                                        <label className='text-md font-bold'>Price</label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            placeholder="Enter Price"
                                            className="input input-bordered input-info w-full"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className='text-md font-bold'>Categories</label>
                                        <input
                                            type="text"
                                            name="categories"
                                            value={formData.categories}
                                            onChange={handleChange}
                                            placeholder="e.g Hike, Adventure, Roadtrip..."
                                            className="input input-bordered input-info w-full placeholder:text-sm"
                                        />
                                    </div>
                                </div>
                                <label className='text-md font-bold'>Availability</label>
                                <input
                                    type="checkbox"
                                    name="availability"
                                    checked={formData.availability}
                                    onChange={handleChange}
                                    className="checkbox"
                                />
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleFileChange}
                                    className="file-input w-full max-w-xs"
                                />
                                <div
                                    className="relative break-inside-avoid bg-gray-200 text-neutral rounded-lg p-4 shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
                                >
                                    <div className="carousel w-64">
                                        {
                                            formData.images && (
                                                formData.images.map((image, i) => (
                                                    <div key={i} className="carousel-item w-full">
                                                        <img
                                                            src={image}
                                                            className="w-full"
                                                            alt={formData.name} />
                                                    </div>
                                                ))
                                            )
                                        }
                                    </div>
                                    <h2 className="text-lg font-bold mb-2">{formData.name || 'Destination Name'}</h2>
                                    <h3 className="text-lg text-gray-700">{formData.location || 'Location'}</h3>
                                    <p className="text-sm mb-2 text-clip w-[17rem]">{formData.description || 'Description'}</p>
                                </div>
                            </div>
                        </div>
                        <div className="modal-action">
                            <button type="submit" className="btn">Save</button>
                            <button type="button" className="btn" onClick={() => {
                                handleCancel()
                                document.getElementById('create_destination_modal').close()
                            }}>Cancel</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default CreateDestinationModal;
