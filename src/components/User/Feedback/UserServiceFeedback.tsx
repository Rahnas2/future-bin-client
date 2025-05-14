import { getUserReviewAboutAppApi } from '@/api/reviewService'
import { reviewType } from '@/types/reviewType'
import { useEffect, useState } from 'react'
import FeedBackAddEditModal from './FeedBackAddEditModal'
import { Rating } from '@mui/material'
import { ThemeProvider } from '@emotion/react'
import themeRating from '@/themes/rating'


const UserServiceFeedback = () => {

    const [userReview, setUserReview] = useState<reviewType | null>(null)
    const [isLoadingReview, setIsLoadingReview] = useState(true)

    const [addEditModal, setAddEditModal] = useState(false)

    const handleAddEditModalOpen = () => {
        setAddEditModal(true)
    }

    const handleAddEditModalClose = () => {
        setAddEditModal(false)
    }

    useEffect(() => {
        const fetchUserReview = async () => {
            try {
                const result = await getUserReviewAboutAppApi()
                console.log('result ', result)
                setUserReview(result.review)
            } catch (error) {
                console.error('error fetching user added feedback', error)
            } finally {
                setIsLoadingReview(false)
            }
        }
        fetchUserReview()
    }, [])

    if (isLoadingReview)
        return (
            <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-accent2"></div>
            </div>
        );

    if (!userReview)
        return (
            <div className="rounded-lg p-6 border border-gray-500 shadow-2xl ">
                <h2 className="text-xl font-semibold mb-4">Your Review About Our Service</h2>
                <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">You haven't added a review about our service yet</p>
                    <button
                        onClick={handleAddEditModalOpen}
                        className="bg-accent hover:bg-accent3 text-white hover:text-seconday font-medium py-2 px-6 rounded-md transition duration-200"
                    >
                        Add Review
                    </button>
                </div>
                {addEditModal && <FeedBackAddEditModal onClose={handleAddEditModalClose} mode="add" setReview={setUserReview} type='app'/>}
            </div>
        );

    return (
        <div className="rounded-lg p-6 border border-gray-500 shadow-2xl transform duration-300 ease-in-out hover:scale-102">
            <h2 className="text-xl font-semibold mb-4">Your Review About Our Service</h2>
            <div className="rounded-lg p-4 ">
                <ThemeProvider theme={themeRating}>
                    <Rating
                        name="read-only"
                        value={userReview.rating}
                        precision={0.5}
                        readOnly
                    />
                </ThemeProvider>
                {userReview.comment ? <p className="opacity-50 mb-4 italic">"{userReview.comment}"</p> : <p></p>}
                <div className="text-right">
                    <button
                        onClick={handleAddEditModalOpen}
                        className="bg-gray-100 hover:bg-gray-500 text-gray-800 hover:text-white cursor-pointer font-medium py-2 px-4 rounded-md transition duration-200"
                    >
                        Update Review
                    </button>
                </div>
            </div>
            {addEditModal && <FeedBackAddEditModal onClose={handleAddEditModalClose} mode="edit" review={userReview} setReview={setUserReview} type='app'/>}
        </div>
    );
}

export default UserServiceFeedback 