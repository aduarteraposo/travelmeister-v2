import Image from "next/image";
import { WPImage } from "../../types/wordpress/media";

export default function CardImage({ image }: { image: WPImage | null }) {
  {
    if (image)
      return (
        <Image
          className="object-cover group-data-[layout=horizontal]:min-h-48 group-data-[layout=horizontal]:w-2/5 group-data-[layout=horizontal]:rounded-l-lg group-data-[layout=vertical]:aspect-video group-data-[layout=vertical]:rounded-t-lg group-data-[layout=vertical]:w-full"
          src={image.url}
          alt={image.alt}
          width={image.width}
          height={image.height}
        />
      );
    return (
      <div className="text-sm bg-gray-100 flex justify-center items-center group-data-[layout=horizontal]:min-h-48 group-data-[layout=horizontal]:w-2/5 group-data-[layout=horizontal]:rounded-l-lg group-data-[layout=vertical]:aspect-video group-data-[layout=vertical]:rounded-t-lg group-data-[layout=vertical]:w-full">
        No image available
      </div>
    );
  }
}
