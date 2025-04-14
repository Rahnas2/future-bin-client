import { getUserReviewsAboutCollectorsApi } from '@/api/reviewService'
import CollectorReviewHistory from '@/components/common/Feedback/CollectorReviewHistory'
import UserServiceFeedback from '@/components/User/Feedback/UserServiceFeedback '
import SideNav from '@/components/UserDash/SideNav'
import { reviewType } from '@/types/reviewType'
import React, { useEffect, useState } from 'react'

type Props = {}

const UserFeedback = (props: Props) => {

    const [collectorsReviews, setCollectorsReviews] = useState<reviewType[] | null>(null)
    const [isLoadingCollectorsReviews, setIsLoadingCollectorsReview] = useState(true)

    useEffect(() => {
        const fetchCollectorsReviews = async () => {
            try {
                const result = await getUserReviewsAboutCollectorsApi()
                setCollectorsReviews(result.reviews)
            } catch (error) {
                console.error('error fetching collectors reviews ', error)
            } finally {
                setIsLoadingCollectorsReview(false)
            }
        }
        fetchCollectorsReviews()
    }, [])



    return (
        <div className="flex gap-4 px-10 ">
            <SideNav />
            <div className="flex-1 py-15 px-8 bg-seconday rounded-lg shadow-sm">
                {isLoadingCollectorsReviews ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {/* User feedback about future bin */}
                        <UserServiceFeedback />

                        {/* User reviewed collectors history */}
                        <div className="mt-10">
                            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Collectors Review</h2>
                            {collectorsReviews && collectorsReviews.length > 0 ? (
                                <CollectorReviewHistory reviews={collectorsReviews} />
                            ) : (
                                <div className=" p-6 rounded-lg text-center text-gray-500">
                                    You haven't added any reviews for collectors yet
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserFeedback