import React, { useEffect, useState } from 'react'
import Avatar from '../../components/common/Avatar'
import useReviews from '../../hooks/useReviews'
import { formatPostDate } from '../../utils/date'

const MoreInfo = ({ destination }) => {
    const { reviews, isLoading, isError } = useReviews()
    const [currentReviews, setCurrentReviews] = useState(null)
    const [offset, setOffset] = useState(1)
    useEffect(() => {
        if (destination && reviews) {
            const x = reviews.filter((review) => review.destination._id === destination._id)
            console.log(x);
            setCurrentReviews(x)
        }
    }, [destination, reviews])
    return (
        <>
            {
                destination && (
                    <div className="grid sm:grid-cols-12 my-3 p-3">
                        <div className="col-span-4 p-5">
                            <h2 className="text-center text-gray-500">More Info:</h2>
                            {
                                destination.moreInfo ? (
                                    <p className="text-gray-500">
                                        {
                                            destination.moreInfo
                                        }
                                    </p>
                                ) : (
                                    <div className="flex flex-col items-start">
                                        <p className="text-gray-500">For more information contact Admin</p>
                                        <p className="text-primary">admin@gmail.com</p>
                                    </div>
                                )
                            }
                        </div>
                        <div className="col-span-8">
                            <h2 className="text-center text-gray-500">{destination.name} reviews</h2>
                            <div className="grid grid-cols-2 justify-center items-center gap-3">
                                {
                                    currentReviews && currentReviews.slice(0, offset).map((review, i) => (
                                        <div key={i} className="bg-white shadow-md hover:shadow-xl transition-all duration-100 rounded-lg p-6 w-[24rem]">
                                            <div className="flex items-center">
                                                <Avatar />
                                                <div>
                                                    <h3 className="text-lg font-semibold text-neutral">
                                                        {review.user.email}
                                                    </h3>
                                                </div>
                                            </div>
                                            <p className="my-2 text-gray-600 italic text-start">
                                                {review.comment.length > 73 ? `${review.comment.slice(0, 73)}...` : review.comment}
                                            </p>
                                            <div className="flex w-full text-start text-xs text-gray-400">
                                                {
                                                    formatPostDate(review.createdAt)
                                                }
                                            </div>
                                        </div>
                                    ))
                                }
                                {
                                    offset > 2 ? (
                                        <p onClick={() => setOffset(2)} className="cursor-pointer text-primary">Show less</p>
                                    ) : (
                                        <p onClick={() => setOffset(offset + 2)} className="cursor-pointer text-primary">Show more +</p>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default MoreInfo