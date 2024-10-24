import React from 'react';
import TestimonialCard from '../../components/common/TestimonialCard';

const TestimonialsSection = () => {
    const testimonials = [
        {
            quote: "TravelMate made my trip unforgettable! The booking process was seamless.",
            name: "Sarah T.",
            image: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
            quote: "The featured destinations were amazing! I can't wait for my next adventure.",
            name: "John D.",
            image: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
            quote: "The customer service was top-notch. Highly recommend!",
            name: "Emily R.",
            image: "https://randomuser.me/api/portraits/women/68.jpg"
        }
    ];

    return (
        <div className="flex flex-wrap gap-6 justify-center my-3">
            {testimonials.map((testimonial, index) => (
                <TestimonialCard
                    key={index}
                    quote={testimonial.quote}
                    name={testimonial.name}
                    image={testimonial.image}
                />
            ))}
        </div>
    );
};

export default TestimonialsSection;
