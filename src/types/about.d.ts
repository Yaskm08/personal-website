import { PortableTextBlock } from '@portabletext/types';

interface AboutEntry extends CMSDocument {
  body: PortableTextBlock[];
}