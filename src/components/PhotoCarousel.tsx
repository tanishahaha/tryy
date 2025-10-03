import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Import all your photos
import photo1 from "@/assets/5.jpg";
import photo2 from "@/assets/1.jpg";
import photo3 from "@/assets/3.jpg";
import photo4 from "@/assets/4.jpg";
import photo5 from "@/assets/2.jpg";
import photo6 from "@/assets/6.jpg";
import photo7 from "@/assets/7.jpg";

// Photos + captions
const photos = [
  { img: photo1, caption: "Celebrating youuu todayy and everydayy" },
  { img: photo2, caption: "Before my bf u were my besttt frienddddd" },
  { img: photo3, caption: "With u i find peace even in chaosss" },
  { img: photo4, caption: "My beautifull cutsieeee boyyyyyy " },
  { img: photo5, caption: "To Our endless foooddd datesss" },
  { img: photo6, caption: "Hehehe cheers to ussss" },
  { img: photo7, caption: "Forever yours ❤️" },
];

export const PhotoCarousel = () => {
  return (
    <section className="py-10 px-3 sm:px-6 bg-gradient-romantic/10">
      <div className="container mx-auto max-w-5xl">
        <Carousel className="w-full">
          <CarouselContent>
            {photos.map((photo, index) => (
              <CarouselItem key={index}>
                <Card className="p-4 sm:p-6 shadow-glow-pink bg-white/10 backdrop-blur-md rounded-2xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    {/* Image */}
                    <div className="p-2 sm:p-4 bg-white/20 backdrop-blur-md rounded-2xl shadow-inner flex items-center justify-center">
                      <img
                        src={photo.img}
                        alt={`Memory ${index + 1}`}
                        className="rounded-2xl object-cover max-h-[250px] sm:max-h-[350px] md:max-h-[400px] w-full transition-transform duration-300 ease-in-out hover:scale-105"
                      />
                    </div>

                    {/* Caption */}
                    <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4">
                      <p className="text-lg sm:text-xl md:text-2xl font-romantic text-white leading-snug">
                        {photo.caption}
                      </p>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Carousel Controls */}
          <CarouselPrevious className="shadow-glow-pink scale-75 sm:scale-90 md:scale-100" />
          <CarouselNext className="shadow-glow-pink scale-75 sm:scale-90 md:scale-100" />
        </Carousel>
      </div>
    </section>
  );
};
