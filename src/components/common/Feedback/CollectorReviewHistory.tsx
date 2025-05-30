import FeedbackCardForCollector from '@/components/collectors/Feedback/FeedbackCardForCollector'
import FeedbackCardForUser from '@/components/User/Feedback/FeedbackCardForUser'
import { IRootState } from '@/redux/slices'
import { ClientTestimonialsType } from '@/types/ClientTestimonialsType'
import { useSelector } from 'react-redux'

type Props = {
    reviews: ClientTestimonialsType[]
}

const CollectorReviewHistory = (props: Props) => {
    const { role } = useSelector((state: IRootState) => state.auth)
    return (
        <div className="space-y-4">
            {role === 'resident' ? (
                props.reviews.map((review, index) => (
                    <FeedbackCardForUser key={index} review={review} />
                ))
            ) : role === 'collector' ? (
                props.reviews.map((review, index) => (
                    <FeedbackCardForCollector key={index} review={review} />
                ))
            ) : (
                <div className="bg-gray-50 p-6 rounded-lg text-center text-gray-500">
                    Please login to view reviews
                </div>
            )}
        </div>
    );
}

export default CollectorReviewHistory