import sanityClient from '@sanity/client';

export enum DocumentType {
  Project = 'project',
  Career = 'career',
  Education = 'education',
  About = 'about'
}

export enum Order {
  ASC = 'asc',
  DESC = 'desc',
}

export enum OrderBy {
  EndYear = 'endYear',
}

export const cmsClient = sanityClient({
  projectId: 'ask0x32c',
  dataset: 'yassinekraiempersonalwebsite',
  useCdn: false,
  apiVersion: new Date().toISOString().split('T')[0],
  token: process.env.SANITY_API_KEY,
});

export function getAllForDocumentType<T>(docType: DocumentType): Promise<T[]> {
  return cmsClient.fetch(
    `*[_type == "${docType}"]
    {..., mainImage{..., asset->{_id, _type, metadata{dimensions, lqip}}},
     images[]{..., asset->{_id, _type, metadata{dimensions, lqip}}},
      body[]{}}`
  );
}

export function getAllForDocumentTypeOrdered<T>(
  docType: DocumentType,
  orderBy: OrderBy,
  order: Order
): Promise<T[]> {
  return cmsClient.fetch(
    `*[_type == "${docType}"]
    {..., image{..., asset->{_id, _type, metadata{lqip}}}} | order(${orderBy} ${order})`
  );
}

export function getAllForDocumentTypeByCreatedDate<T>(
  docType: DocumentType,
  limit = 0
): Promise<T[]> {
  return cmsClient.fetch(
    `*[_type == "${docType}"]${
      limit < 1 ? '' : `[0...${limit}]`
    }{..., body[]{..., asset->{_id, _type, metadata{dimensions, lqip}}}} | order(_createdAt desc)`
  );
}

export function getProjectForSlug<T>(slug: string): Promise<T[]> {
  return cmsClient.fetch(
    `*[_type == "project" && slug.current == "${slug}"][0]
    {..., mainImage{..., asset->{_id, _type, metadata{lqip}}},
     images[]{..., asset->{_id, _type, metadata{lqip, dimensions}}},
      body[]{..., asset->{_id, _type, metadata{dimensions, lqip}}}}`
  );
}