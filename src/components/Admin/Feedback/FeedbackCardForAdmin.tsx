import { getAllAppReviewApi } from '@/api/reviewService'
import themeRating from '@/themes/rating'
import { ClientTestimonialsType } from '@/types/ClientTestimonialsType'
import { Rating, ThemeProvider } from '@mui/material'
import { UserIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'

type Props = {
    review: ClientTestimonialsType,
}

const FeedbackCardForAdmin: React.FC<Props> = ({ review }) => {

    return (
        <div className="rounded-lg p-4 shadow-sm border border-gray-500 hover:shadow-md transition-shadow duration-200">

                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        {review.user.image ? (
                            <img
                                className="w-16 h-16 rounded-full object-cover"
                                src={review.user.image}
                                alt={`${review.user.firstName} ${review.user.lastName}`}
                            />
                        ) : (
                            <FaUserCircle className="h-16 w-16 text-gray-400" />
                        )}
                    </div>

                    <div className="py-2">
                        <div className="text-text text-xl font-medium capitalize">
                            {review.user.firstName} {review.user.lastName}
                        </div>
                        <ThemeProvider theme={themeRating}>
                            <Rating
                                name="read-only"
                                value={review.rating}
                                precision={0.5}
                                readOnly
                            />
                        </ThemeProvider>
                    </div>

                    <div className="text-text opacity-70 mt-5">
                        "{review.comment}"
                      </div>

                </div>
            </div>
    )
}

export default FeedbackCardForAdmin