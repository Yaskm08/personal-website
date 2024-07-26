import { PortableText, PortableTextComponents } from '@portabletext/react';
import { PortableTextBlock } from '@portabletext/types';

import { Blockquote, Box, List, Text, Title } from '@mantine/core';

import NextImage from 'next/image';
import Link from 'next/link';

import ImageContainer, { ImageType } from '@/src/cms/documents/ImageContainer';
import ListContainer from '@/src/cms/documents/ListContainer';
import { urlForImage } from '@/src/cms/images';

interface DocumentRendererProps {
  document: PortableTextBlock[] | undefined;
}

interface ImageComponent {
  value: Image;
}

interface Quote {
  quote: string;
  citation: string;
  floatRight?: boolean;
}

interface QuoteComponent {
  value: Quote;
}

const customComponents: PortableTextComponents = {
  types: {
    fullWidthImage: ({
      value: { asset, alt, floatRight, caption },
    }: ImageComponent) => {
      const aspectRatio = asset.metadata?.dimensions.aspectRatio || 1;
      return (
        <>
          <ImageContainer
            floatRight={floatRight}
            type={ImageType.FullWidthImage}
            aspectRatio={1 / aspectRatio}
            caption={caption}
          >
            <NextImage
              placeholder="blur"
              blurDataURL={asset.metadata?.lqip}
              sizes="(min-width: 768px) 75vw,
                (win-width: 576px) 90vw,
                100vw"
              src={urlForImage(asset).url()}
              alt={alt}
              fill
            />
          </ImageContainer>
        </>
      );
    },
    halfWidthImage: ({
      value: { asset, alt, floatRight, caption },
    }: ImageComponent) => {
      const aspectRatio = asset.metadata?.dimensions.aspectRatio || 1;
      return (
        <>
          <ImageContainer
            floatRight={floatRight}
            type={ImageType.HalfWidthImage}
            aspectRatio={1 / aspectRatio}
            caption={caption}
          >
            <NextImage
              placeholder="blur"
              blurDataURL={asset.metadata?.lqip}
              sizes="(min-width: 768px) 50vw,
                (win-width: 576px) 75vw,
                100vw"
              src={urlForImage(asset).url()}
              alt={alt}
              fill
            />
          </ImageContainer>
        </>
      );
    },
    fullWidthQuote: ({ value: { citation, quote } }: QuoteComponent) => {
      return <Blockquote cite={`- ${citation}`}>{quote}</Blockquote>;
    },
    halfWidthQuote: ({
      value: { citation, quote, floatRight },
    }: QuoteComponent) => {
      return (
        <Box
          w="50%"
          sx={{
            float: floatRight ? 'right' : 'left',
            '@media (max-width: 576px)': {
              width: '100%',
            },
          }}
        >
          <Blockquote cite={`- ${citation}`}>{quote}</Blockquote>
        </Box>
      );
    },
  },
  block: {
    h1: ({ children }) => (
      <Title mb="12px" color="blue.1">
        {children}
      </Title>
    ),
    h3: ({ children }) => (
      <Text component="h3" size="xl" mt="10px" color="blue.1">
        {children}
      </Text>
    ),
    normal: ({ children }) => (
      <Text component="p" mt="8px">
        {children}
      </Text>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ListContainer>
        <List type="unordered">{children}</List>
      </ListContainer>
    ),
    number: ({ children }) => (
      <ListContainer>
        <List type="ordered">{children}</List>
      </ListContainer>
    ),
  },
  listItem: {
    bullet: ({ children }) => <List.Item>{children}</List.Item>,
    number: ({ children }) => <List.Item>{children}</List.Item>,
  },
  marks: {
    link: ({ children, value: { href } }) => {
      const target = !href.startsWith('/') && '_blank';
      return (
        <Link className="text-link" href={href} target={target || ''}>
          {children}
        </Link>
      );
    },
  },
};

export default function DocumentRenderer({ document }: DocumentRendererProps) {
  if (!document) return null;
  return <PortableText value={document} components={customComponents} />;
}