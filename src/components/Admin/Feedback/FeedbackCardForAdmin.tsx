import { deleteReviewApi } from '@/api/reviewService'
import themeRating from '@/themes/rating'
import { ClientTestimonialsType } from '@/types/ClientTestimonialsType'
import { Rating, ThemeProvider } from '@mui/material'
import React from 'react'
import toast from 'react-hot-toast'
import { FaUserCircle } from 'react-icons/fa'

type Props = {
    review: ClientTestimonialsType,
    onDelete: (_id: string) => void
}

const FeedbackCardForAdmin: React.FC<Props> = ({ review, onDelete }) => {

    const handleDeleteReview = async (_id: string) => {
        try {
            await deleteReviewApi(_id)
            onDelete(_id)
            toast.success('successfully deleted the review')
        } catch (error) {
            console.error('error deleting review ', error)
            toast.error('something went wrong')
        }
    }

    return (
        <div className="rounded-lg p-4 shadow-sm border border-gray-500 hover:shadow-md transition-shadow duration-200 mb-5">
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                    <div className=" rounded-full p-2 mr-2">
                        {review.user.image ? <img className='w-10 h-10' src={review.user.image} alt="" /> : <FaUserCircle size={20} className="w-10 h-10" />}
                    </div>
                    <div>
                        <h3 className="font-medium">{review.user.firstName + ' ' + review.user.lastName || 'User'}</h3>
                        <p className="text-sm text-gray-500"></p>
                    </div>
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
            <div className='flex justify-between px-3'>
                <p className="">{review.comment}</p>
                <button onClick={() => handleDeleteReview(review._id!)} className='bg-red-500 px-5 py-1 text-sm rounded-md cursor-pointer'>Delete</button>
            </div>

        </div>
    );
}

export default FeedbackCardForAdmin