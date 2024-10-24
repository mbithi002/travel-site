import React from 'react'

// static markup

const DisplayCard = ({ image, title, text }) => {
    return <div className="relative h-full rounded-lg overflow-hidden shadow-lg hover:scale-95 transition-transform duration-200">
        <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
        />
        <div className="text-base-100 hover:text-gray-500 relative flex flex-col items-end justify-end h-full bg-black hover:bg-opacity-0 transition-all duration-100 bg-opacity-[.3] rounded-lg p-4">
            <h3 className="text-md font-bold">{title}</h3>
            <p className="text-[.68rem] text-end">{text}</p>
        </div>
    </div>

}

const AboutBento = () => {
    return (
        <>
            <div className="sm:hidden block relative w-full h-[40dvh] text-accent hover:text-base-100 transition-all duration-100 rounded-md">
                {
                    <DisplayCard
                        image={"https://i.pinimg.com/474x/2f/12/a2/2f12a2fbbc3f0c3b29122137c1aa7e80.jpg"}
                        title={'Why Choose Us?'}
                        text={' we believe in offering more than just a service. We aim to create a community where [your audience, e.g., travelers, explorers] can connectw together'}
                    />
                }
            </div>
            <div className="grid sm:grid-cols-12 h-screen sm:h-[80dvh] my-3 sm:p-10 gap-5">
                <div className="col-span-6 sm:block hidden  sm:col-span-4 relative w-full h-full text-accent hover:text-base-100 transition-all duration-100 rounded-md">
                    {
                        <DisplayCard
                            image={"https://i.pinimg.com/474x/96/d7/47/96d747524bb0b20357bac9a1974146fe.jpg"}
                            title={'Why Choose Us?'}
                            text={' we believe in offering more than just a service. We aim to create a community where [your audience, e.g., travelers, explorers] can coether'}
                        />
                    }
                </div>
                <div className="col-span-8 h-full">
                    <div className="grid grid-rows-2 gap-4 grid-flow-col h-full">
                        <div className="grid grid-cols-2 gap-4">
                            {
                                <DisplayCard
                                    image={"https://i.pinimg.com/474x/e6/cd/f6/e6cdf68ad3b4789a6e0ff556d63b9bbe.jpg"}
                                    title={'Get involved'}
                                    text={'We invite you to join our journey by becoming a part of our platform. Whether you’re here to , make bookings, discover nes, etc. wxperience possible'}
                                />
                            }
                            {
                                <DisplayCard
                                    image={"https://i.pinimg.com/474x/33/10/8d/33108da5434b4e777f7cecb23ff6e2d5.jpg"}
                                    title={'Who we are?'}
                                    text={'We are a passionate team of [e.g., travel enthusiasts, tech experts, experienced professionals] dedicated to has to offer.'}
                                />
                            }
                        </div>
                        <div className="relative w-full h-full text-accent hover:text-base-100 transition-all duration-100 rounded-md">
                            {
                                <DisplayCard
                                    image={"https://i.pinimg.com/474x/42/3a/40/423a4003d06805be0727542d1fb46b2e.jpg"}
                                    title={'Our Mission, and Vision'}
                                    text={'Mission : to empower travelers and adventurers with accurate, up-to-date, and insightful information e. Vision:Looking to the future, we envision come to reality'}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutBento