"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { WPImage } from "../types/wordpress";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import WheelGesturesPlugin from "embla-carousel-wheel-gestures";

type Props = {
  images: WPImage[];
};

export default function HotelImageCarousel({ images }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { dragFree: true, loop: false },
    [WheelGesturesPlugin()]
  );

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = thumbnailsRef.current;
    if (!el) return;

    const checkOverflow = () => {
      setIsOverflowing(el.scrollWidth > el.clientWidth + 1);
    };

    checkOverflow();

    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const update = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", update);
    emblaApi.on("reInit", update);

    queueMicrotask(update);

    return () => {
      emblaApi.off("select", update);
      emblaApi.off("reInit", update);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  const withButtons = true;
  const withThumbnails = false;

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-3">
            {images.map((image, index) => (
              <div
                key={`${image.url}-${index}`}
                className="min-w-0 flex-[0_0_auto]"
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="h-48 md:h-80 lg:h-96 w-auto max-w-none rounded-2xl object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        {withButtons && (
          <div className="lg:flex gap-1 absolute -top-12 right-0">
            <button
              type="button"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="relative rounded-full bg-black text-white w-9 h-9 shadow disabled:opacity-20 disabled:cursor-auto cursor-pointer"
              aria-label="Previous image"
            >
              <IoIosArrowBack className="absolute top-1/2 left-1/2 -translate-y-1/2 translate-x-[calc(-50%-1px)]" />
            </button>

            <button
              type="button"
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="relative rounded-full bg-black text-white w-9 h-9 shadow disabled:opacity-20 cursor-pointer"
              aria-label="Next image"
            >
              <IoIosArrowForward className="absolute top-1/2 left-1/2 -translate-y-1/2 translate-x-[calc(-50%+1px)]" />
            </button>
          </div>
        )}
        {withThumbnails && (
          <div
            ref={thumbnailsRef}
            className={`flex gap-1 mt-2 md:mt-3 overflow-x-scroll asdfg ${
              isOverflowing ? "justify-start" : "justify-center"
            }`}
          >
            {images.map((image, index) => (
              <Image
                key={image.url}
                src={image.url}
                alt={image.alt}
                width={image.width}
                height={image.height}
                onClick={() => scrollTo(index)}
                className={`h-12 md:h-18 w-auto max-w-none rounded-md object-cover cursor-pointer border-2 md:border-3 ${
                  index === selectedIndex
                    ? "border-green-300"
                    : "border-transparent"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
