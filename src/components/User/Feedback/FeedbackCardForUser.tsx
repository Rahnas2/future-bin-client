import themeRating from '@/themes/rating'
import { ClientTestimonialsType } from '@/types/ClientTestimonialsType'
import { reviewType } from '@/types/reviewType'
import { Rating, ThemeProvider } from '@mui/material'
import { UserIcon } from 'lucide-react'
import React from 'react'
import { FaUserCircle } from 'react-icons/fa'

type Props = {
  review: ClientTestimonialsType
}

const FeedbackCardForUser: React.FC<Props> = ({ review }) => {
  return (
    <div className="rounded-lg p-4 shadow-sm border border-gray-500 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <div className="rounded-full p-2 mr-3">
            {review.user.image ? <img className='w-10 h-10' src={review.user.image} alt="" /> : <FaUserCircle size={20} className="w-10 h-10" />}
          </div>
          <div>
            <h3 className="font-medium">{review.user.firstName + ' ' + review.user.lastName || 'User'}</h3>
            <p className="text-sm "></p> 
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
      <p className="opacity-50">{review.comment}</p>
    </div>
  );
}

export default FeedbackCardForUser