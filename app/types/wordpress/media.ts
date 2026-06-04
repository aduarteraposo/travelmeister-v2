export type WPFeaturedMedia = {
  id: number;
  source_url: string;
  alt_text: string;
  media_details: {
    width: number;
    height: number;
  };
};

export type WPImage = {
  id: number;
  url: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};
