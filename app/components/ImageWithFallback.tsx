import Image from "next/image";
import { WPImage } from "../types/wordpress/media";

export default function ImageWithFallback({
  image,
  caption,
  className,
  fallbackClasses,
}: {
  image: WPImage | null | undefined | false;
  caption?: string | undefined;
  className?: string;
  fallbackClasses?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {image ? (
        <>
          <Image
            className="w-full h-full object-cover"
            src={image.url}
            alt={image.alt}
            width={image.width}
            height={image.height}
          />
          {caption && (
            <p className="md:absolute md:left-2 md:bottom-2 bg-[rgba(255,255,255,.8)] rounded-full py-1 px-2 font-medium text-xs">
              {caption}
            </p>
          )}
        </>
      ) : (
        <div
          className={`flex justify-center items-center h-full w-full ${
            fallbackClasses ? fallbackClasses : "bg-gray-100 text-sm"
          }`}
        >
          No image found
        </div>
      )}
    </div>
  );
}
