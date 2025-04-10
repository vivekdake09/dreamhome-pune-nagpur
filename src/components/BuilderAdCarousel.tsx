
import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

interface BuilderAd {
  id: string;
  name: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}

const builderAds: BuilderAd[] = [
  {
    id: "1",
    name: "Prestige Constructions",
    description: "Luxury apartments with world-class amenities in prime locations",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80",
    ctaText: "View Projects",
    ctaLink: "#",
  },
  {
    id: "2",
    name: "Godrej Properties",
    description: "Premium residences with sustainable design and modern living",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=80",
    ctaText: "Explore Now",
    ctaLink: "#",
  },
  {
    id: "3",
    name: "Lodha Group",
    description: "Iconic buildings redefining the skyline with luxury and elegance",
    image: "https://images.unsplash.com/photo-1628133287836-40bd5453bed1?w=800&auto=format&fit=crop&q=80",
    ctaText: "Book a Tour",
    ctaLink: "#",
  },
  {
    id: "4",
    name: "Hiranandani Developers",
    description: "Township living with integrated facilities and premium design",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&auto=format&fit=crop&q=80",
    ctaText: "Learn More",
    ctaLink: "#",
  },
  {
    id: "5",
    name: "Shapoorji Pallonji",
    description: "Crafting landmarks with innovation and architectural excellence",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&auto=format&fit=crop&q=80",
    ctaText: "Contact Now",
    ctaLink: "#",
  },
];

const BuilderAdCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = React.useState<CarouselApi>();

  // Set up auto-rotation
  useEffect(() => {
    if (!api) return;
    
    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [api]);

  // Update current slide when carousel changes
  const handleSelect = useCallback(() => {
    if (!api) return;
    setCurrentSlide(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    
    api.on("select", handleSelect);
    return () => {
      api.off("select", handleSelect);
    };
  }, [api, handleSelect]);

  return (
    <section className="w-full py-6 md:py-8 bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full relative"
          setApi={setApi}
        >
          <CarouselContent>
            {builderAds.map((ad) => (
              <CarouselItem key={ad.id} className="md:basis-3/4 lg:basis-3/5">
                <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-64 md:h-80">
                    <img 
                      src={ad.image} 
                      alt={ad.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{ad.name}</h3>
                      <p className="text-white text-sm md:text-base mb-4">{ad.description}</p>
                      <Button 
                        variant="default" 
                        className="w-fit"
                        asChild
                      >
                        <a href={ad.ctaLink}>
                          {ad.ctaText}
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="-left-4 md:-left-6" />
            <CarouselNext className="-right-4 md:-right-6" />
          </div>
        </Carousel>
        
        {/* Carousel Indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {builderAds.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? "bg-primary" : "bg-gray-300 hover:bg-primary/70"
              }`}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuilderAdCarousel;
