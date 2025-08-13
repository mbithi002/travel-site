import React from 'react';

const PulseLoader = ({ size = "md", color = 'black' }) => {
    const sizeClass = `loading-${size}`;
    const colorClass = `text-${color}`;
    return (
        <div>
            <span className={`loading loading-ring ${colorClass}`}></span>
        </div>
    )
}

export default PulseLoader
