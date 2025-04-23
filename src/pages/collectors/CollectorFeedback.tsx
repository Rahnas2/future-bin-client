import { getCollectorReviewsApi } from '@/api/reviewService'
import ComponentSpinner from '@/components/common/ComponentSpinner'
import CollectorReviewHistory from '@/components/common/Feedback/CollectorReviewHistory'
import { IRootState } from '@/redux/slices'
import { reviewType } from '@/types/reviewType'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

type Props = {}

const CollectorFeedback = (props: Props) => {

    const [feedbacks, setFeedbacks] = useState<reviewType[] | null>(null)
    const [isLoadingFeedbacks, setIsLoadingFeedbacks] = useState(true)

    const { collector } = useSelector((state: IRootState) => state.collector)

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const result = await getCollectorReviewsApi(collector?._id!)
                setFeedbacks(result.reviews)
            } catch (error) {
                console.error('error fetching collectors reviews ', error)
            } finally {
                setIsLoadingFeedbacks(false)
            }
        }
        fetchFeedbacks()
    }, [])

    return (
        <div className='flex min-h-lvh'>
            <div className="bg-primary my-10 mr-10 rounded-t-2xl px-4 py-4 flex-1 ">
                {isLoadingFeedbacks ? <ComponentSpinner /> :
                    <div className="mt-10">
                        <h2 className="text-lg font-medium mb-4 border-b border-b-gray-500 pb-5">All Feedbacks</h2>
                        {feedbacks && feedbacks.length > 0 ? (
                            <CollectorReviewHistory reviews={feedbacks} />
                        ) : (
                            <div className=" p-6 rounded-lg text-center text-gray-500">
                                No Feedbacks About You
                            </div>
                        )}
                    </div>
                }

            </div>
        </div>
    )
}

export default CollectorFeedback