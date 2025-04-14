import { reviewType } from '@/types/reviewType'
import { Rating } from '@mui/material'
import React from 'react'

type Props = {
    review: reviewType
}

const FeedbackCardForCollector = (props: Props) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <div className="bg-blue-100 rounded-full p-2 mr-3">
            {/* <UserIcon size={20} className="text-blue-600" /> */}
          </div>
          <div>
            {/* <h3 className="font-medium text-gray-800">{review.userName || 'User'}</h3>
            <p className="text-sm text-gray-500">{formattedDate}</p> */}
          </div>
        </div>
        <Rating
          name="read-only" 
          value={props.review.rating} 
          precision={0.5} 
          readOnly 
          size="small"
        />

      </div>
      <p className="text-gray-700">{props.review.comment}</p>
    </div>
  );
}

export default FeedbackCardForCollector