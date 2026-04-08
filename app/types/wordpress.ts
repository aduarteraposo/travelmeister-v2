export type WPPost = {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  acf: {
    primary_destination: number;
    hero_image: number;
    article_type: string;
    hotel_sections: HotelList[];
    quick_picks: QuickPick[];
  };
  _embedded: {
    "wp:featuredmedia"?: WPFeaturedMedia[];
  };
};

export type QuickPick = {
  pick_label: string;
  hotel_anchor: string;
  reason: string;
  cta_text: string;
};

export type HotelList = {
  section_title: string;
  hotels: WPHotel[];
};

export type WPHotel = {
  name: string;
  badge: string;
  images: WPImage[];
  description: string;
  tags: Tag[];
  best_if: string;
  not_ideal_if: string;
  ideal_for: string[];
  area: string;
  price_level: string;
  booking_links: WPLink[];
  filter_categories: string[];
  comparison: {
    show_in_table: boolean;
  };
};

export interface HotelWithSection extends WPHotel {
  section_title: string;
}

export type WPImage = {
  id: number;
  url: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export type Tag = {
  label: string;
};

export type WPLink = {
  link: {
    title: string;
    url: string;
    target: string;
  };
};

export type WPFeaturedMedia = {
  id: number;
  source_url: string;
  alt_text: string;
  media_details: {
    width: number;
    height: number;
  };
};

export type WPDestination = {
  id: number;
  slug: string;
  name: string;
  parent: number;
  acf: {
    destination_type: string;
    description_text: string;
    image: string | number;
  };
  _embedded: {
    up: WPParent[];
  };
};

export type WPParent = {
  id: number;
  slug: string;
  name: string;
};
