import Image from "next/image";
import { WPImage } from "../types/wordpress/media";

export default function ImageWithFallback({
  image,
  imageClasses,
  fallbackClasses,
}: {
  image: WPImage | null | undefined | false;
  imageClasses: string;
  fallbackClasses?: string;
}) {
  return (
    <>
      {image ? (
        <Image
          className={`${imageClasses} object-cover`}
          src={image.url}
          alt={image.alt}
          width={image.width}
          height={image.height}
        />
      ) : (
        <div
          className={`flex justify-center items-center ${imageClasses} ${
            fallbackClasses ? fallbackClasses : "bg-gray-100 text-sm"
          }`}
        >
          No image found
        </div>
      )}
    </>
  );
}
