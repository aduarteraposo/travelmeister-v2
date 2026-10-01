import Image from "next/image";
import { ReactNode } from "react";
import { WPImage } from "../types/wordpress/media";
import ExpandableTeaserContent from "./ExpandableTeaserContent";
import Link from "next/link";

export default function DestinationTeaser({
  image,
  title,
  description,
  details,
  slug,
}: {
  image: WPImage;
  title: string;
  description?: string;
  details?: ReactNode;
  slug?: string;
}) {
  const header = (
    <>
      <h3
        className={`font-outdoor text-5xl ${
          description ? "md:text-[2.75rem]" : "md:text-[3.25rem] leading-[0.8]"
        }`}
      >
        {details ? (
          title
        ) : (
          <Link href={`/${slug}`} className="after:absolute after:inset-0">
            {title}
          </Link>
        )}
      </h3>
      {description && <p>{description}</p>}
    </>
  );

  return (
    // isolate: stacking context so the -z-10 photo sits above the white background but below the overlay.
    // The overlay stays in flow (pushed down by justify-end) so the only positioned ancestor of the
    // title link's stretched ::after is this <li>, making the whole card clickable
    <li className="w-72 md:w-80 shrink-0 mb-4 aspect-2/3 rounded-xl overflow-hidden bg-white text-center relative isolate flex flex-col justify-end">
      {/* The photo stops above the bottom corners so no photo pixels bleed
          through the antialiased rounded edge under the white overlay */}
      <div className="absolute inset-x-0 top-0 bottom-4 -z-10">
        <Image
          loading="eager"
          src={image.url}
          alt={image.alt}
          fill
          sizes="(min-width: 768px) 20rem, 18rem"
          className="object-cover"
        />
      </div>
      {/* Fades in over the top padding, then keeps fading behind the text so it stays readable.
          Solid white by the last 1rem, where the photo ends */}
      <div
        className={`min-h-0 flex flex-col px-4 pt-16 bg-[linear-gradient(to_bottom,transparent,rgb(255_255_255/0.75)_5rem,white_calc(100%-1rem))] ${
          details ? "pb-4" : "pb-8"
        }`}
      >
        {details ? (
          <ExpandableTeaserContent header={header}>
            {details}
          </ExpandableTeaserContent>
        ) : (
          header
        )}
      </div>
    </li>
  );
}
