import React from 'react';
import Avatar from '../../components/common/Avatar';
import useReviews from '../../hooks/useReviews';

const BookingHero = () => {
    const { reviews, isLoading, isError } = useReviews()
    return (
        <div className="relative w-80 h-96 mx-auto rounded-lg overflow-hidden shadow-lg z-10">
            {/* Background Image */}
            <img
                src="https://i.pinimg.com/474x/68/81/4f/68814f4fe279ad10761e3c68420f8b4a.jpg"
                alt="Scenic Destination"
                className="w-full h-full object-cover z-10"
            />

            {/* Review Tags */}
            {reviews && reviews?.slice(0, 3).map((review, index) => (
                <div
                    key={index}
                    style={{ position: 'absolute', ...review.position }}
                    className="flex items-center space-x-2 bg-white rounded-full shadow-md px-3 py-1 z-20"
                >
                    {/* Static Avatar */}
                    <Avatar />

                    {/* Email and Comment */}
                    <div className="text-sm font-medium">
                        <p>{review.user.email}</p>
                        <p className="text-gray-700">{review.comment}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BookingHero;
