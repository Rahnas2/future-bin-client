import { getAllAppReviewApi } from '@/api/reviewService';
import FeedbackCardForAdmin from '@/components/Admin/Feedback/FeedbackCardForAdmin';
import ComponentSpinner from '@/components/common/ComponentSpinner';
import { ClientTestimonialsType } from '@/types/ClientTestimonialsType';
import React, { useEffect, useState } from 'react'

type Props = {}

const FeedbackAdmin = (props: Props) => {

    const [reviews, setReviews] = useState<ClientTestimonialsType[]>([]);

    const [isLoadingReviews, setIsLoadingReviews] = useState(true)

    useEffect(() => {
        const fetchAppReviews = async () => {
            try {
                setIsLoadingReviews(true)
                const result = await getAllAppReviewApi()
                setReviews(result.reviews)
            } catch (error) {
                console.error('error fetching app reviews', error)
            } finally {
                setIsLoadingReviews(false)
            }
        }
        fetchAppReviews()
    }, [])

  return (
    <div className="flex min-h-lvh">
   
      <div className="bg-primary my-10 mr-10 rounded-t-2xl px-4 py-4 flex-1 ">

      {isLoadingReviews ? <ComponentSpinner /> :
      reviews.length === 0 ? <div className="text-center py-12">No Feedbacks available yet</div> : 
      <>{reviews.map(review => <FeedbackCardForAdmin review={review}/>)}</>
      }
      </div>
    </div>
  )
}

export default FeedbackAdmin