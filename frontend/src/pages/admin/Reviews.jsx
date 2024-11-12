import React from 'react'
import useReviews from '../../hooks/useReviews'
import { formatPostDate } from '../../utils/date'

const Reviews = () => {
    const { reviews, isLoading, isError } = useReviews()
    if (isLoading) {
        return <div className="skeleton h-[75dvh] my-3 w-full bg-gray-300"></div>
    }
    if (isError) {
        return <div className="h-[75dvh] my-3 w-full text-red-500 text-center flex items-center justify-center">
            <p className="">Something went wrong😢😢</p>
        </div>
    }
    if (!isLoading && !isError && reviews?.length < 1) return <div className="w-full h-full text-center text-base-200">No reviews yet</div>
    return (
        < div >
            <div className="overflow-x-scroll sm:overflow-x-auto w-full min-h-[75dvh]">
                <table className="table bg-gray-100 text-base-100">
                    {/* head */}
                    <thead className='text-neutral'>
                        <tr>
                            <th>
                            </th>
                            <th>User</th>
                            <th>Destination</th>
                            <th>Rating</th>
                            <th>Comment</th>
                            <th>Created at</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reviews && reviews.map((review, i) => (
                                <tr key={review._id} className='hover:bg-base-100 text-neutral transition-all duration-100'>
                                    <th className='hover:bg-gray-100 transition-all duration-100'>
                                        {i + 1}
                                    </th>
                                    <td className='hover:bg-gray-100 transition-all duration-100'>
                                        {review.user.email}
                                    </td>
                                    <td className='hover:bg-gray-100 transition-all duration-100'>
                                        {review.destination.name}
                                    </td>
                                    <td className='hover:bg-gray-100 transition-all duration-100'>
                                        {review.rating}
                                    </td>
                                    <th className='hover:bg-gray-100 transition-all duration-100'>
                                        {review.comment}
                                    </th>
                                    <th className='hover:bg-gray-100 transition-all duration-100'>
                                        {formatPostDate(review.createdAt)}
                                    </th>
                                    <th className='text-primary hover:cursor-pointer hover:underline hover:bg-gray-100 transition-all duration-100'>
                                    </th>
                                </tr>
                            ))
                        }
                    </tbody>
                    {/* foot */}
                    <tfoot className='text-neutral'>
                        <tr>
                            <th>
                            </th>
                            <th>User</th>
                            <th>Destination</th>
                            <th>Rating</th>
                            <th>Comment</th>
                            <th>Created at</th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div >
    )
}

export default Reviews