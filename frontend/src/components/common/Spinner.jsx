import React from 'react'

const Spinner = ({ size: 'sm' }) => {
    const sizeClass = `loading-${size}`
    return (
        <span className={`loading loading-spinner ${sizeClass}`}></span>
    )
}

export default Spinner