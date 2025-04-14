import { addReviewApi, updateReviewApi } from '@/api/reviewService'
import Input from '@/themes/input'
import themeRating from '@/themes/rating'
import { reviewType } from '@/types/reviewType'
import { Rating, TextField, ThemeProvider } from '@mui/material'
import { SyntheticEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { IoMdClose } from 'react-icons/io'

type Props = {
    onClose: () => void
    mode: 'add' | 'edit'
    type: 'app' | 'collector'
    collectorId?: string
    setReview: (React.Dispatch<React.SetStateAction<reviewType | null>>)
    review?: reviewType
}



const FeedBackAddEditModal = (props: Props) => {

  const [data, setData] = useState<Partial<reviewType> | undefined>(props.review);

  const handleRatingChange = (_: React.SyntheticEvent, newValue: number | null) => {
    setData({ ...data, rating: newValue || 0 });
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, comment: e.target.value });
  };

  const handleAddOrEditReview = async () => {
    if (!data || !data.rating) {
      toast.error('Please select stars');
      return;
    }

    try {
      if (props.mode === 'add') {

        const sentToData = {
            ...data,
            type: props.type
        }
        if(props.type === 'collector'){
            sentToData['collectorId'] = props.collectorId
        }
        const result = await addReviewApi(sentToData)
        props.setReview(result.review)
        toast.success('Review added successfully');
      } else {
        const result = await updateReviewApi(data);
        props.setReview(result.updatedReview)
        toast.success('Review updated successfully');
      }
      props.onClose();
    } catch (error) {
      console.error('Error adding or editing review ', error);
      toast.error('Failed to save review');
    }
  };

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-primary rounded-lg shadow-lg w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold ">
                        {props.mode === 'add' ? 'Add New Review' : 'Update Your Review'}
                    </h2>
                    
                </div>

                <div className="mb-6">
                    <label className="block mb-2">Your Rating</label>
                    <div className="flex items-center">
                    <ThemeProvider theme={themeRating}>
                        <Rating
                            name="rating"
                            value={data?.rating || 0}
                            precision={0.5}
                            onChange={handleRatingChange}
                            size="large"

                        />
                    </ThemeProvider>
                        <span className="ml-2 ">
                            {data?.rating ? `${data.rating} out of 5` : 'Select rating'}
                        </span>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block mb-2">Your Feedback</label>
                    <ThemeProvider theme={themeRating}>
                    <TextField
                        name="comment"
                        value={data?.comment || ''}
                        onChange={handleCommentChange}
                        placeholder={`${props.type === 'app' ? 'Share your experience with our service...' : 'Share Your Feedback about the collector...'}`}
                        multiline
                        rows={4}
                        fullWidth
                        variant="outlined"
                    />
                    </ThemeProvider>
                </div>

                <div className="flex justify-end space-x-3">
                    <button
                        onClick={props.onClose}
                        className="px-4 py-2 border border-gray-500 text-gray-200 rounded-md hover:bg-gray-500 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAddOrEditReview}
                        className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent3 hover:text-seconday transition-colors"
                    >
                        {props.mode === 'add' ? 'Submit Review' : 'Update Review'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FeedBackAddEditModal