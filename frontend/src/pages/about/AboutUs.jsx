import React from 'react'
import AboutBento from './AboutBento'
const AboutUs = () => {
    return (
        <>
            <div className="hero sm:h-[60dvh]">
                <div className="hero-content text-center">
                    <div className="max-w-lg">
                        <h1 className="text-5xl font-bold text-accent">Welcome to Travel</h1>
                        <p className="py-6 text-neutral text-[.83rem]">
                            At [Your Website Name], we are dedicated to helping you [describe the core purpose of your website, e.g., explore the world’s most breathtaking destinations, discover unique experiences, etc.]. Whether you're planning your next adventure or seeking inspiration, our platform is here to guide you every step of the way..
                        </p>
                        {/* <button className="btn btn-accent text-white">Start Your Journey</button> */}
                    </div>
                </div>
            </div>
            <AboutBento />
        </>
    )
}

export default AboutUs