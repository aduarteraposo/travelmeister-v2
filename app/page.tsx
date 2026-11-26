import { getHomepageData } from "./lib/page-data/home-page";
import ImageWithFallback from "./components/ImageWithFallback";
import Link from "next/link";
import { getDestinationHref } from "./lib/links";
import DotSeparated from "./components/DotSeparated";
import RoomsWorthTheTripSection from "./components/RoomsWorthTheTripBlock";
import { IMAGE_SIZES } from "./lib/image-sizes";
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
        <div className="px-6 flex flex-col flex-1 justify-center text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {heroSection.title}
          </h1>
          <p className="mb-6">{heroSection.text}</p>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center md:justify-start">
            {featuredDestinations.length > 0 && (
              <Link
                className="rounded-full w-full md:w-auto font-medium py-3 px-6 bg-black text-white border border-black md:text-sm lg:text-base"
                href={getDestinationHref(featuredDestinations[0])}
              >
                Start with {featuredDestinations[0].title}
              </Link>
            )}
            <a
              href="#rooms"
              className="w-full md:w-auto py-3 px-6 border border-black rounded-full font-medium md:text-sm lg:text-base"
            >
              Rooms worth the trip
            </a>
          </div>
        </div>
        <div className="md:w-2/5 lg:w-1/2 md:shrink-0">
          <ImageWithFallback
            image={heroSection.image}
            sizes="(min-width: 1152px) 560px,(min-width: 1024px) 50vw, (min-width: 768px) 400px, 100vw"
            preload
            className="rounded-xl aspect-square"
            caption={heroSection.image?.caption}
          />
        </div>
      </section>
      <section className="my-16">
        <ul className="flex flex-col md:flex-row justify-between gap-4">
          {trustPoints.map((p, i) => (
            <li key={i} className="bg-gray-100 rounded-xl p-4 flex-1">
              <p className="font-bold text-lg mb-2">{p.title}</p>
              <p>{p.text}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="my-16">
        <h2 className="font-outdoor text-6xl mb-2">Destinations</h2>
        <div className="flex flex-col md:flex-row gap-4">
          {featuredDestinations.length > 0 && (
            <div className="flex-1">
              <article className="relative h-full">
                <ImageWithFallback
                  image={featuredDestinations[0]?.heroImage}
                  sizes={IMAGE_SIZES.half}
                  className="rounded-xl aspect-4/3"
                />
                <div className="rounded-xl bg-[rgba(255,255,255,.8)] p-4 absolute bottom-2 left-2 max-w-[calc(100%-8px)]">
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
            </div>
          )}
          {comingSoon.length > 0 && (
            <ul className="flex-1 grid grid-cols-2 gap-4 auto-rows-fr">
              {comingSoon.map((d) => (
                <li key={d.name}>
                  <article className="relative rounded-xl h-full">
                    <ImageWithFallback
                      image={d.image}
                      sizes="(min-width: 1152px) 268px, (min-width: 1024px) 25vw, 50vw"
                      className="rounded-xl opacity-80 aspect-square md:aspect-auto"
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
        <section id="rooms" className="my-16">
          <RoomsWorthTheTripSection
            roomsBlock={roomsBlock}
            labelsById={labelsById}
          />
        </section>
      )}
      {popularArticles.length > 0 && (
        <section className="my-16">
          <h2 className="font-outdoor text-6xl mb-4">Popular Guides</h2>
          <ul className="md:grid grid-cols-4 gap-4 justify-items-stretch">
            {popularArticles.slice(0, 8).map((a) => (
              <li key={a.slug}>
                <ArticleTeaser article={a} />
              </li>
            ))}
          </ul>
        </section>
      )}
      <section className="my-16 flex flex-col md:flex-row items-center gap-6 border p-6 rounded-xl">
        <div className="h-48 shrink-0">
          <ImageWithFallback
            image={aboutSection.image}
            sizes="192px"
            className="rounded-full aspect-square"
          />
        </div>
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
