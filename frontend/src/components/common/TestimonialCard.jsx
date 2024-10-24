import React from 'react';

const TestimonialCard = ({ quote, name, image }) => {
    return (
        <div className="bg-white shadow-md hover:shadow-xl transition-all duration-100 rounded-lg p-6 max-w-sm">
            <div className="flex items-center">
                {image && (
                    <img
                        className="w-16 h-16 rounded-full mr-4"
                        src={image}
                        alt={`${name}'s avatar`}
                    />
                )}
                <div>
                    <h3 className="text-lg font-semibold text-neutral">{name}</h3>
                </div>
            </div>
            <p className="mt-4 text-gray-600 italic">"{quote}"</p>
        </div>
    );
};

export default TestimonialCard;
