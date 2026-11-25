import { notFound, permanentRedirect } from "next/navigation";
import { getDestinationBySlug } from "../wordpress/destination";
import { getExperienceBySlug } from "../wordpress/experience";
import { normalizeExperience } from "../normalizers/experience";
import { hasExperiencePage } from "../pages-rules";
import { getExperienceHref } from "../links";
import { normalizeDestination } from "../normalizers/destination";

export default async function getExperiencePageData(
  experienceSlug: string,
  destinationSlug: string
) {
  const [wpExperience, wpDestination] = await Promise.all([
    getExperienceBySlug(experienceSlug),
    getDestinationBySlug(destinationSlug),
  ]);

  if (!wpExperience) {
    notFound();
  }

  const experience = normalizeExperience(wpExperience);

  if (!hasExperiencePage(experience)) {
    notFound();
  }

  if (destinationSlug !== experience.urlDestination) {
    permanentRedirect(getExperienceHref(experience));
  }

  if (!wpDestination) {
    notFound();
  }

  const destination = normalizeDestination(wpDestination);

  return { experience, destination };
}
