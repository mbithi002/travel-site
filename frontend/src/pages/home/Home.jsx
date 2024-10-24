import React from 'react'
import HomeImage from '../../assets/images/home/resort.jpg'
import Activities from './Activities'
import FeaturedDestinations from './FeaturedDestinations'
import TestimonialsSection from './TestimonialsSection'

const Home = () => {
    return (
        <>
            <div className="grid sm:grid-cols-12 sm:gap-4 sm:h-[80dvh] h-[90dvh] w-full">
                <div className="col-span-8 mx-auto w-full hidden sm:block">
                    <div className="hero h-full">
                        <div className="hero-content text-center">
                            <div className="max-w-md">
                                <h1 className="text-5xl font-bold text-accent">Discover Your Next Adventure</h1>
                                <p className="py-6 text-neutral">
                                    Explore the world's most beautiful destinations with ease.
                                    Browse destinations, book for a trip, pay and enjoy.
                                </p>
                                <button className="btn btn-accent text-white">Start Your Journey</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-4 mx-auto w-full flex sm:max-h-[80dvh] relative">
                    <img
                        src={HomeImage}
                        alt="Travel Destination"
                        className="object-cover w-full h-[80dvh]"
                    />
                    {/* Hero Text Overlay for small screens */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 sm:hidden flex items-center justify-center text-center">
                        <div className="max-w-md px-4">
                            <h1 className="text-4xl font-bold text-white">Discover Your Next Adventure</h1>
                            <p className="py-4 text-gray-200">
                                Explore the world's most beautiful destinations with ease.
                                Browse destinations, book for a trip, pay and enjoy.
                            </p>
                            <button className="btn btn-accent text-white">Start Your Journey</button>
                        </div>
                    </div>
                </div>
            </div>
            <FeaturedDestinations />
            <Activities />
            <TestimonialsSection />
        </>
    )
}

export default Home