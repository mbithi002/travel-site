import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router';
import useBentoVariants from '../../motion/useBentoVariants';

const BentoDestinations = ({ destinations, isError, isLoading }) => {
    const { parentVar, childVar, childVar2 } = useBentoVariants();
    const navigate = useNavigate();

    if (!isLoading && !isError && destinations?.length < 1) {
        return <div className="w-full h-[80dvh] text-center text-base-200">No destinations yet</div>;
    }

    return (
        <div className="sm:px-4 my-3">
            {isLoading && (
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 sm:gap-4 gap-2 space-y-4">
                    {/* Skeleton Loading */}
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex w-[14rem] flex-col gap-4 mx-auto">
                            <div className="skeleton h-48 w-full bg-accent"></div>
                            <div className="skeleton h-10 w-28 bg-accent"></div>
                            <div className="skeleton h-10 w-full bg-accent"></div>
                            <div className="skeleton h-10 w-full bg-accent"></div>
                        </div>
                    ))}
                </div>
            )}
            <motion.div
                initial="hide"
                animate="show"
                variants={parentVar}
                className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 sm:gap-4 gap-2 space-y-4"
            >
                {destinations &&
                    destinations.map((destination, index) => (
                        <motion.div
                            key={index}
                            custom={index}
                            initial="hide"
                            animate="show"
                            variants={childVar}
                            onClick={() => navigate(`/booking/${destination._id}`)}
                            className="relative break-inside-avoid bg-gray-200 text-neutral rounded-lg sm:p-4 p-2 shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="carousel">
                                {destination.images &&
                                    destination.images.map((image, i) => (
                                        <div key={i} className="carousel-item w-full">
                                            <img src={image} className="w-full" alt={destination.name} />
                                        </div>
                                    ))}
                            </div>
                            <motion.div
                                initial="hide"
                                animate="show"
                                variants={childVar2}
                            >
                                <h2 className="text-lg font-bold mb-2">{destination.name}</h2>
                                <p className="text-sm">{destination.description}</p>
                            </motion.div>
                        </motion.div>
                    ))}
            </motion.div>
        </div>
    );
};

export default BentoDestinations;

