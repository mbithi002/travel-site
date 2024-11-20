import { motion } from 'framer-motion'
import React from 'react'

const FeaturedDestinations = () => {
    return (
        <div>
            <h2 className="text-neutral text-center text-xl my-2">Featured Destinations</h2>
            <div className="grid sm:grid-cols-12 gap-4 my-4">
                <motion.div
                    className="sm:col-span-3 bg-accent h-[16rem] rounded-lg hover:cursor-pointer transition-all duration-200 hover:scale-[.9] hover:shadow-lg"
                >
                    <div className="relative h-[16rem] rounded-lg overflow-hidden shadow-lg hover:scale-y-95 transition-transform duration-200">
                        <img
                            src="https://i.pinimg.com/474x/70/c5/3a/70c53a09197e61a6348e1b217b398c63.jpg"
                            alt="bali"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
                        />
                        <div className="relative flex flex-col justify-center h-full bg-black hover:bg-opacity-0 transition-all duration-100 bg-opacity-50 rounded-lg p-4">
                            <h3 className="text-white text-xl font-bold">Bali, Indonesia</h3>
                            <p className="text-white">Adventure awaits</p>
                        </div>
                    </div>
                </motion.div>
                <div className="sm:col-span-3 bg-accent h-[16rem] rounded-lg hover:cursor-pointer transition-all duration-200 hover:scale-[.9] hover:shadow-lg">
                    <div className="relative h-[16rem] rounded-lg overflow-hidden shadow-lg hover:scale-y-95 transition-transform duration-200">
                        <img
                            src="https://i.pinimg.com/enabled_lo/474x/d4/5a/29/d45a294d23284295912f2859c3561906.jpg"
                            alt="bali"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
                        />
                        <div className="relative flex flex-col justify-center h-full bg-black hover:bg-opacity-0 transition-all duration-100 bg-opacity-50 rounded-lg p-4">
                            <h3 className="text-white text-xl font-bold">Bali, Indonesia</h3>
                            <p className="text-white">Adventure awaits</p>
                        </div>
                    </div>
                </div>
                <div className="sm:col-span-6 bg-primary h-[16rem] rounded-lg hover:cursor-pointer transition-all duration-200 hover:scale-[.9] hover:shadow-lg">
                    <div className="relative h-[16rem] rounded-lg overflow-hidden shadow-lg hover:scale-y-95 transition-transform duration-200">
                        <img
                            src="https://i.pinimg.com/474x/82/75/57/8275573535b8e4fbc1b88173ac04be62.jpg"
                            alt="bali"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
                        />
                        <div className="relative flex flex-col justify-center h-full bg-black hover:bg-opacity-0 transition-all duration-100 bg-opacity-50 rounded-lg p-4">
                            <h3 className="text-white text-xl font-bold">Bali, Indonesia</h3>
                            <p className="text-white">Adventure awaits</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid sm:grid-cols-12 gap-4 my-4">
                <div className="sm:col-span-4 h-[16rem] rounded-lg hover:cursor-pointer transition-all duration-200 hover:scale-[.9] hover:shadow-lg">
                    <div className="sm:col-span-6 bg-primary h-[16rem] rounded-lg hover:cursor-pointer transition-all duration-200 hover:scale-[.9] hover:shadow-lg">
                        <div className="relative h-[16rem] rounded-lg overflow-hidden shadow-lg hover:scale-y-95 transition-transform duration-200">
                            <img
                                src="https://i.pinimg.com/enabled_lo/474x/c5/2d/6b/c52d6b052e405eafd84d8876c044eb56.jpg"
                                alt="bali"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
                            />
                            <div className="relative flex flex-col justify-center h-full bg-black hover:bg-opacity-0 transition-all duration-100 bg-opacity-50 rounded-lg p-4">
                                <h3 className="text-white text-xl font-bold">Bali, Indonesia</h3>
                                <p className="text-white">Adventure awaits</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sm:col-span-6 h-[16rem] rounded-lg hover:cursor-pointer transition-all duration-200 hover:scale-[.9] hover:shadow-lg">
                    <div className="sm:col-span-6 bg-primary h-[16rem] rounded-lg hover:cursor-pointer transition-all duration-200 hover:scale-[.9] hover:shadow-lg">
                        <div className="relative h-[16rem] rounded-lg overflow-hidden shadow-lg hover:scale-y-95 transition-transform duration-200">
                            <img
                                src="https://i.pinimg.com/474x/b5/b9/50/b5b9508f565c91e781714445beca26e4.jpg"
                                alt="bali"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
                            />
                            <div className="relative flex flex-col justify-center h-full bg-black hover:bg-opacity-0 transition-all duration-100 bg-opacity-50 rounded-lg p-4">
                                <h3 className="text-white text-xl font-bold">UAE, Dubai</h3>
                                <p className="text-white">Adventure awaits</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sm:col-span-2 h-[16rem] rounded-lg hover:cursor-pointer transition-all duration-200 hover:scale-[.9] hover:shadow-lg">
                    <div className="sm:col-span-6 bg-primary h-[16rem] rounded-lg hover:cursor-pointer transition-all duration-200 hover:scale-[.9] hover:shadow-lg">
                        <div className="relative h-[16rem] rounded-lg overflow-hidden shadow-lg hover:scale-y-95 transition-transform duration-200">
                            <img
                                src="https://i.pinimg.com/474x/c6/9e/81/c69e811e42dd81b75fe7b5597a4b4fa0.jpg"
                                alt="bali"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
                            />
                            <div className="relative flex flex-col justify-center h-full bg-black hover:bg-opacity-0 transition-all duration-100 bg-opacity-50 rounded-lg p-4">
                                <h3 className="text-white text-xl font-bold">Tsavo, Kenya</h3>
                                <p className="text-white">Wildlife</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeaturedDestinations