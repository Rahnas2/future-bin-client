import { getAllAppReviewApi } from "@/api/reviewService";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import themeRating from "@/themes/rating";
import { ClientTestimonialsType } from "@/types/ClientTestimonialsType";
import { ThemeProvider } from "@mui/material";

import Rating from '@mui/material/Rating';
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import ComponentSpinner from "../common/ComponentSpinner";

type Props = {}

const ClientTestimonials = (props: Props) => {

  const [reviews, setReviews] = useState<ClientTestimonialsType[]>([]);

  const [isLoadingReviews, setIsLoadingReviews] = useState(true)

  useEffect(() => {
    const fetchAppReviews = async () => {
      try {
        setIsLoadingReviews(true)
        const result = await getAllAppReviewApi('', 3)
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
    <div className='flex flex-col items-center overflow-x-hidden'>
      <div className='text-accent mb-4 text-lg md:text-xl font-medium'>Client Testimonials</div>

      <h1 className='text-xl md:text-2xl font-semibold md:font-bold mb-10'>See what our Client has to Say</h1>

      {isLoadingReviews ? <ComponentSpinner /> :
      reviews.length === 0 ? <div className="text-center py-12">No testimonials available yet</div> : 
        <Carousel
          opts={{
            align: "center",
            loop: true
          }}
          className="w-full "
        >
         <CarouselContent className="py-4">
              {reviews.map((review, index) => (
                <CarouselItem 
                  key={index} 
                  className={`md:basis-1/2 lg:basis-1/3 ${reviews.length === 1 ? 'mx-auto' : ''}`}
                >
                  <Card className="bg-seconday border-0 rounded-md shadow-2xl h-full">
                    <CardContent className="flex flex-col justify-center p-6">
                      <div className="flex gap-4 items-center">
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
                      </div>
                      <div className="text-text opacity-70 mt-5">
                        "{review.comment}"
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Make navigation buttons more visible */}
            <CarouselPrevious className="left-2 border-0 bg-accent shadow-md" />
            <CarouselNext className="right-2 border-0 bg-accent shadow-md" />
        </Carousel>
      }
    </div>
  )
}

export default ClientTestimonials