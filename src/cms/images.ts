import imageUrlBuilder from '@sanity/image-url';
import { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';
import { SanityAsset } from '@sanity/image-url/lib/types/types';

import { cmsClient } from '@/src/cms/client';

const imageBuilder = imageUrlBuilder(cmsClient);

export function urlForImage(source: SanityAsset): ImageUrlBuilder {
  return imageBuilder.image(source);
}