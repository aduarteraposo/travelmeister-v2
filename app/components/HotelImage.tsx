import Image from "next/image";
import { WPImage } from "../types/wordpress/media";

export default function HotelImage({ image }: { image: WPImage }) {
  return (
    <Image
      className="object-cover h-32 rounded-t-xl"
      src={image.url}
      alt={image.alt}
      width={image.width}
      height={image.height}
    />
  );
}
