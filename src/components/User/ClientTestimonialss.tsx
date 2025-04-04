import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { useState } from "react";

type Props = {}

const ClientTestimonials = (props: Props) => {

  const [value, setValue] = useState<number | null>(2);

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
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="bg-primary">
                  <CardContent className="flex items-center justify-center p-6">
                    <div className="">
                          <img src="" alt="" />
                          <div>
                            <div>Bilal John</div>

                            
                            
                          </div>
                    </div>
                    <div>The color of a star depends on its temperature. Stars emit light across a spectrum, but their dominant color is determined by their surface temperature and some times i would like to order something</div>
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