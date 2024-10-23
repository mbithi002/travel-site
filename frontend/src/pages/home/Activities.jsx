import React from 'react'

const Activities = () => {
    return (
        <div>
            <h2 className="text-center text-neutral text-xl font-bold my-2">Activities</h2>

            {/* First Section */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-10 p-5 sm:p-10">
                {/* Image Section */}
                <div className="sm:col-span-8 h-full w-full">
                    <img
                        src='https://i.pinimg.com/474x/35/64/74/356474f9e08ee9382d3ac7edb9162376.jpg'
                        alt="Travel Destination"
                        className="object-cover w-full h-[50vh] sm:h-[65vh] rounded-md"
                    />
                </div>

                {/* Text Section */}
                <div className="sm:col-span-4 flex items-center justify-center w-full shadow-lg text-center p-6 sm:p-10">
                    <div className="flex flex-row sm:flex-col items-start">
                        <div className="hidden sm:block h-full w-[4px] bg-primary rounded-xl mr-4 sm:mr-0 sm:mb-6"></div>
                        <div className="flex flex-col text-left">
                            <h3 className="font-bold text-2xl underline text-neutral">Hiking</h3>
                            <p className="text-neutral my-3">Discover breathtaking trails and nature.</p>
                            <p className="my-3 text-primary cursor-pointer hover:underline transition-all duration-100">Explore</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Second Section */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-10 p-5 sm:p-10 mt-10">
                {/* Text Section */}
                <div className="sm:col-span-4 flex items-center justify-center w-full shadow-lg text-center p-6 sm:p-10">
                    <div className="flex flex-row sm:flex-col items-start">
                        <div className="hidden sm:block h-full w-[4px] bg-primary rounded-xl mr-4 sm:mr-0 sm:mb-6"></div>
                        <div className="flex flex-col text-left">
                            <h3 className="font-bold text-2xl underline text-neutral">Culinary Tours</h3>
                            <p className="text-neutral my-3">Taste the best dishes from around the world.</p>
                            <p className="my-3 text-primary cursor-pointer hover:underline transition-all duration-100">Explore</p>
                        </div>
                    </div>
                </div>

                {/* Image Section */}
                <div className="sm:col-span-8 h-full w-full">
                    <img
                        src='https://i.pinimg.com/736x/8e/82/66/8e8266912dadc40a53bc0fd729d42634.jpg'
                        alt="Travel Destination"
                        className="object-cover w-full h-[50vh] sm:h-[65vh] rounded-md"
                    />
                </div>
            </div>

            {/* Second Section */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-10 p-5 sm:p-10 mt-10">

                {/* Image Section */}
                <div className="sm:col-span-8 h-full w-full">
                    <img
                        src='https://i.pinimg.com/474x/dc/ed/1d/dced1d8d77de563c09aff2bc13a59411.jpg'
                        alt="Travel Destination"
                        className="object-cover w-full h-[50vh] sm:h-[65vh] rounded-md"
                    />
                </div>
                {/* Text Section */}
                <div className="sm:col-span-4 flex items-center justify-center w-full shadow-lg text-center p-6 sm:p-10">
                    <div className="flex flex-row sm:flex-col items-start">
                        <div className="hidden sm:block h-full w-[4px] bg-primary rounded-xl mr-4 sm:mr-0 sm:mb-6"></div>
                        <div className="flex flex-col text-left">
                            <h3 className="font-bold text-2xl underline text-neutral">City Tours</h3>
                            <p className="text-neutral my-3">Uncover the secrets of iconic cities.</p>
                            <p className="my-3 text-primary cursor-pointer hover:underline transition-all duration-100">Explore</p>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    )
}

export default Activities