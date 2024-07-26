interface Image {
  _type: string;
  alt: string;
  link?: string;
  asset: Asset;
  caption?: string;
  floatRight?: boolean;
}

interface ImageMetadata {
  dimensions: ImageDimensions;
  lqip: string;
}

interface ImageDimensions {
  aspectRatio: number;
  height: number;
  width: number;
}