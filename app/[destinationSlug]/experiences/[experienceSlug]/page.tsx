import { normalizeExperience } from "@/app/lib/normalizers/experience";
import getExperiencePageData from "@/app/lib/page-data/experience-page";
import { getExperienceBySlug } from "@/app/lib/wordpress/experience";

type ExpriencePageProps = {
  params: Promise<{ experienceSlug: string; destinationSlug: string }>;
};

export default async function ExperiencePage({ params }: ExpriencePageProps) {
  const { experienceSlug, destinationSlug } = await params;

  const { experience, destination } = await getExperiencePageData(
    experienceSlug,
    destinationSlug
  );

  return <h1>{experience.title}</h1>;
}
