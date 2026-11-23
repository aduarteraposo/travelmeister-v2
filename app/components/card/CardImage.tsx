import Image from "next/image";
import { WPImage } from "../../types/wordpress/media";
import ImageWithFallback from "../ImageWithFallback";

export default function CardImage({ image }: { image: WPImage | null }) {
  return (
    <div className="aspect-2/1 md:group-data-[layout=horizontal]:min-h-48 md:group-data-[layout=horizontal]:w-2/5 group-data-[layout=horizontal]:aspect-none">
      <ImageWithFallback
        image={image}
        className="rounded-t-xl w-full h-full md:group-data-[layout=horizontal]:rounded-l-xl md:group-data-[layout=horizontal]:rounded-r-none group-data-[layout=vertical]:aspect-video group-data-[layout=vertical]:rounded-t-xl"
      />
    </div>
  );
}
