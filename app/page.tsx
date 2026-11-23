import { getHomepageData } from "./lib/page-data/home-page";
import ImageWithFallback from "./components/ImageWithFallback";
import Link from "next/link";
import { getDestinationHref } from "./lib/links";
import DotSeparated from "./components/DotSeparated";
import RoomsWorthTheTripSection from "./components/RoomsWorthTheTripBlock";
import ArticleTeaser from "./components/ArticleTeaser";

export default async function Home() {
  const {
    heroSection,
    trustPoints,
    featuredDestinations,
    comingSoon,
    roomsBlock,
    popularArticles,
    aboutSection,
    labelsById,
  } = await getHomepageData();

  return (
    <>
      <section className="flex flex-col-reverse md:flex-row gap-6 md:gap-4 mb-16">
        <div className="px-6 flex flex-col justify-center text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {heroSection.title}
          </h1>
          <p className="mb-6">{heroSection.text}</p>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center md:justify-start">
            {featuredDestinations.length > 0 && (
              <Link
                className="rounded-full w-full md:w-auto font-medium py-3 px-6 bg-black text-white border border-black cursor-pointer"
                href={getDestinationHref(featuredDestinations[0])}
              >
                Start with {featuredDestinations[0].title}
              </Link>
            )}
            <a
              href="#rooms"
              className="w-full md:w-auto py-3 px-6 border border-black rounded-full font-medium"
            >
              Rooms worth the trip
            </a>
          </div>
        </div>
        <ImageWithFallback
          image={heroSection.image}
          className="aspect-square rounded-xl"
          caption={heroSection.image?.caption}
        />
      </section>
      <section className="mb-16">
        <ul className="flex flex-col md:flex-row justify-between gap-4">
          {trustPoints.map((p, i) => (
            <li key={i} className="bg-gray-100 rounded-xl p-4 flex-1">
              <p className="font-semibold mb-2">{p.title}</p>
              <p>{p.text}</p>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="font-outdoor text-6xl mb-2">Destinations</h2>
        <div className="flex flex-col md:flex-row gap-4">
          {featuredDestinations.length > 0 && (
            <article className="relative flex-1">
              <ImageWithFallback
                image={featuredDestinations[0]?.heroImage}
                className="h-full rounded-xl"
              />
              <div className="rounded-xl bg-[rgba(255,255,255,.8)] p-4 absolute bottom-2 left-2">
                <h3 className="font-semibold text-xl">
                  <Link
                    href={getDestinationHref(featuredDestinations[0])}
                    className="after:absolute after:inset-0"
                  >
                    {featuredDestinations[0].title}
                  </Link>
                </h3>
                <p>
                  <DotSeparated
                    items={[
                      featuredDestinations[0].articleCount,
                      "Where to stay",
                      "What to do",
                      "Food & Drink",
                    ]}
                  />
                </p>
              </div>
            </article>
          )}
          {comingSoon.length > 0 && (
            <ul className="flex-1 grid grid-cols-2 gap-4 auto-rows-fr">
              {comingSoon.map((d) => (
                <li key={d.name}>
                  <article className="relative rounded-xl h-full">
                    <ImageWithFallback
                      image={d.image}
                      className="rounded-xl w-full h-full opacity-80 aspect-4/3 md:aspect-auto"
                    />
                    <div className="absolute left-2 bottom-2 bg-[rgba(255,255,255,.7)] py-1.5 px-3 rounded-xl">
                      <span className="text-xs md:text-sm">Coming Soon</span>
                      <h3 className="text-sm md:text-base font-semibold">
                        {d.name}
                      </h3>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      {roomsBlock.kind !== "none" && (
        <section id="rooms">
          <RoomsWorthTheTripSection
            roomsBlock={roomsBlock}
            labelsById={labelsById}
          />
        </section>
      )}
      <section className="mb-16">
        <h2 className="font-outdoor text-6xl mb-4">Popular Guides</h2>
        <ul className="md:grid grid-cols-4 gap-6 justify-items-stretch">
          {popularArticles.slice(0, 8).map((a) => (
            <li key={a.slug}>
              <ArticleTeaser article={a} />
            </li>
          ))}
        </ul>
      </section>
      <section className="flex flex-col md:flex-row items-center gap-6 border p-6 rounded-xl">
        <ImageWithFallback
          image={aboutSection.image}
          className="rounded-full aspect-square h-48 shrink-0"
        />
        <div className="flex flex-col gap-4 text-center md:text-left items-center md:items-baseline">
          <h2 className="text-xl font-bold">{aboutSection.title}</h2>
          <p>{aboutSection.text}</p>
          <Link
            href="/about"
            className="rounded-full px-4 py-2 border border-black font-medium"
          >
            More about us
          </Link>
        </div>
      </section>
    </>
  );
}
