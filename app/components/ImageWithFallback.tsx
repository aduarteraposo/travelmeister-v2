import Image from "next/image";
import { WPImage } from "../types/wordpress/media";

export default function ImageWithFallback({
  image,
  sizes,
  preload,
  caption,
  className = "",
  fallbackClasses,
}: {
  image: WPImage | null | undefined | false;
  sizes: string;
  preload?: boolean;
  caption?: string | undefined;
  className?: string;
  fallbackClasses?: string;
}) {
  return (
    <figure className="relative w-full h-full">
      {image ? (
        <>
          <div className={`relative overflow-hidden h-full ${className}`}>
            <Image
              fill
              className="object-cover"
              src={image.url}
              alt={image.alt}
              sizes={sizes}
              preload={preload}
            />
          </div>
          {caption && (
            <figcaption className="md:absolute md:left-2 md:bottom-2 md:max-w-[calc(100%-16px)] md:bg-[rgba(255,255,255,.8)] md:rounded-full md:py-1 md:px-2 md:font-medium text-xs mt-1 md:mt-0">
              {caption}
            </figcaption>
          )}
        </>
      ) : (
        <div className={`overflow-hidden ${className}`}>
          <div
            className={`flex justify-center items-center h-full w-full ${
              fallbackClasses ? fallbackClasses : "bg-gray-100 text-sm"
            }`}
          >
            No image found
          </div>
        </div>
      )}
    </figure>
  );
}
