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

import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { useEffect, useState } from "react";

type Props = {}

const ClientTestimonials = (props: Props) => {

  const [reviews, setReviews] = useState<ClientTestimonialsType[]>([]);

  const [isLoadingReviews, setIsLoadingReviews] = useState(true)
  useEffect(() => {
    const fetchAppReviews = async () => {
      try {
        const result = await getAllAppReviewApi()
        setReviews(result.reviews)
      } catch (error) {
        console.error('error fetching app reviews', error)
      }
    }
    fetchAppReviews()
  }, [])

  return (
    <div className='flex flex-col items-center'>
      <div className='text-accent mb-4 text-xl font-medium'>Client Testimonials</div>

      <h1 className='text-2xl font-bold mb-10'>See what our Client has to Say</h1>

      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {reviews.map((review, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="bg-seconday border-0 w-sm rounded-md shadow-2xl">
                  <CardContent className="flex flex-col  justify-center">
                    <div className="flex gap-8">
                      <div><img className="w-18 h-18 rounded-full" src={review.user.image} alt="" /></div>
                      <div className="py-2">
                        <div className="text-text text-2xl capitalize ">{review.user.firstName + review.user.lastName}</div>

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

                    <div className="text-text opacity-50 mt-5 px-2">{review.comment}</div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default ClientTestimonials