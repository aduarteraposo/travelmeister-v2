// `sizes` values for next/image, named by where an image sits in the layout.
// They describe the DISPLAYED width (the browser picks the file), from the widest
// breakpoint to the narrowest. Main container: max-w-6xl (1152px) with px-4 → 1120px.
// When in doubt, round up: slightly too big costs a few KB, too small looks blurry.
export const IMAGE_SIZES = {
  // full container width: page heroes
  full: "(min-width: 1152px) 1120px, 100vw",
  // main column of an article (3 of 4 grid columns from lg)
  articleColumn: "(min-width: 1024px) 830px, 100vw",
  // half the container, stacked on mobile
  half: "(min-width: 1152px) 552px, (min-width: 768px) 50vw, 100vw",
  // one of three columns from md, stacked on mobile
  grid3: "(min-width: 1152px) 360px, (min-width: 768px) 33vw, 100vw",
  // one of four columns from md, stacked on mobile
  grid4: "(min-width: 1152px) 270px, (min-width: 768px) 25vw, 100vw",
  // image part (about 2/5) of a horizontal card, full width when stacked
  horizontalCard: "(min-width: 768px) 360px, 100vw",
  // related-articles sidebar from lg, full width below
  sidebar: "(min-width: 1024px) 250px, 100vw",
  // fixed-width cards in horizontal lanes (w-60 / w-66)
  card: "264px",
  // small thumbnails (w-32)
  thumb: "128px",
} as const;
