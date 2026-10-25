import Image from "next/image";
import { Experience } from "../types/app/experience";
import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";

export default function ExperienceCard({
  experience,
}: {
  experience: Experience;
}) {
  return (
    <li className="mb-28 last:mb-0">
      <h3 className="flex flex-col-reverse gap-1 lg:gap-4 items-start lg:items-center lg:flex-row text-2xl font-bold mb-3">
        {experience.title}
      </h3>
      {experience.images.length > 0 && (
        <>
          <Image
            src={experience.images[0].url}
            alt={experience.images[0].alt}
            width={experience.images[0].width}
            height={experience.images[0].height}
          />
          <p className="text-xs text-gray-500 mt-1">
            {experience.images[0].caption}
          </p>
        </>
      )}
      <p className="mb-4">{experience.shortDescription}</p>
      <ul className="flex items-center gap-3 mb-4">
        <li className="flex items-center gap-1">
          <span>
            <FaLocationDot />
          </span>
          <Link
            href={experience.mapLink}
            className="hover:underline underline-offset-3"
          >
            View on Map
          </Link>
        </li>
        <span>-</span>
        <li>{experience.priceFrom}</li>
      </ul>
      <div className="mt-8 flex flex-wrap gap-3 md:gap-4">
        {experience.ctaLinks?.map((link) => (
          <Link
            className="bg-black text-white font-medium rounded-full py-2.5 px-6 w-full md:w-auto"
            key={link.label}
            href={link.url}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </li>
  );
}
