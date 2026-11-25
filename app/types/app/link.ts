// One link an item can have. external = opens another site (new tab).
// sponsored = affiliate link (rel="sponsored"), required by Google for paid links.
export type ItemLink = {
  href: string;
  label: string;
  external: boolean;
  sponsored?: boolean;
  kind: "page" | "booking" | "map";
};

// All links an item can have. Which one a component shows is up to the component.
export type ItemLinks = {
  page: ItemLink | null; // our own page (hotel page, experience page)
  bookings: ItemLink[] | null; // first CTA (Booking.com, GetYourGuide, …)
  map: ItemLink | null; // Google Maps / "View on map"
};
