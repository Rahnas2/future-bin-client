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

const ClientTestimonials = () => {
  const [reviews, setReviews] = useState<ClientTestimonialsType[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);

  useEffect(() => {
    const fetchAppReviews = async () => {
      try {
        setIsLoadingReviews(true);
        const result = await getAllAppReviewApi('', 10);
        setReviews(result.reviews);
      } catch (error) {
        console.error('error fetching app reviews', error);
      } finally {
        setIsLoadingReviews(false);
      }
    };
    fetchAppReviews();
  }, [])

  return (
    <section className="w-full py-12 px-4 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <p className="text-blue-600 font-medium text-lg mb-2">Client Testimonials</p>
          <h2 className="text-3xl font-bold">See What Our Clients Have To Say</h2>
        </div>

        {isLoadingReviews ? (
          <ComponentSpinner />
        ) : reviews.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            No testimonials available yet
          </div>
        ) : (
          <Carousel
            opts={{
              align: "center",
            }}
            className="w-2xs md:w-full"
          >
            <CarouselContent>
              {reviews.map((review, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="bg-seconday border-0 rounded-md shadow-lg md:shadow-2xl h-full transform duration-300 ease-in-out hover:scale-105">
                      <CardContent className="flex flex-col items-center justify-center p-4 md:p-6">
                        <div className=" flex gap-3 md:gap-4 items-center">
                          <div className="flex-shrink-0">
                            {review.user.image ? (
                              <img
                                className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover"
                                src={review.user.image}
                                alt={`${review.user.firstName} ${review.user.lastName}`}
                              />
                            ) : (
                              <FaUserCircle className="h-12 w-12 md:h-16 md:w-16 text-gray-400" />
                            )}
                          </div>
                          <div className="py-1 md:py-2">
                            <div className="text-text text-lg md:text-xl font-medium capitalize truncate">
                              {review.user.firstName} {review.user.lastName}
                            </div>
                            <ThemeProvider theme={themeRating}>
                              <Rating
                                name="read-only"
                                value={review.rating}
                                precision={0.5}
                                readOnly
                                size="small"
                              />
                            </ThemeProvider>
                          </div>
                        </div>
                        <div className="text-text opacity-70 mt-3 md:mt-5 text-sm md:text-base line-clamp-4 md:line-clamp-none">
                          "{review.comment}"
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:inline bg-accent border-0" />
            <CarouselNext className="hidden md:inline bg-accent border-0" />
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default ClientTestimonials;