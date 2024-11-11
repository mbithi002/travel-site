import React, { useState } from 'react'
import Bookings from './Bookings'
import Cancelled from './Cancelled'
import ToBeReviewed from './ToBeReviewed'

const BookingsInfoPage = () => {
    const [content, setContent] = useState('bookings')

    return (
        <>
            <div className="flex w-full items-start flex-row p-2">
                <details className="dropdown">
                    <summary className="btn m-1">Menu</summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow text-neutral">
                        <li onClick={() => setContent('bookings')}><a>Bookings</a></li>
                        <li onClick={() => setContent('cancelled')}><a>Cancelled</a></li>
                        <li onClick={() => setContent('toBeReviewed')}><a>To be reviewed</a></li>
                    </ul>
                </details>
            </div>
            {/* content */}
            <div className="p-2">
                {content === 'bookings' && <Bookings />}
                {content === 'cancelled' && <Cancelled />}
                {content === 'toBeReviewed' && <ToBeReviewed />}
            </div>
        </>
    )
}

export default BookingsInfoPage
