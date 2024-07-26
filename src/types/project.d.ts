import { PortableTextBlock } from '@portabletext/types';

interface ProjectEntry extends CMSDocument {
  description: string;
  images?: Image[];
  mainImage: Image;
  name: string;
  slug: Slug;
  startYear: number;
  tools: string[];
  links?: string[];
  body?: PortableTextBlock[];
}