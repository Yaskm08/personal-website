interface CMSDocument {
  _id: string;
  _type: string;
}

interface Slug {
  _type: string;
  current: string;
}

interface Asset {
  _ref?: string;
  _type: string;
  _id?: string;
  metadata?: ImageMetadata;
}