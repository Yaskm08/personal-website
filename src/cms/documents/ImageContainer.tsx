import { PropsWithChildren } from 'react';

import { Box, Sx, Text } from '@mantine/core';

export enum ImageType {
  FullWidthImage = 'fullWidthImage',
  HalfWidthImage = 'halfWidthImage',
}

interface ImageContainerProps extends PropsWithChildren {
  type: ImageType;
  aspectRatio: number;
  floatRight?: boolean;
  caption?: string;
}

export default function ImageContainer({
  type,
  aspectRatio,
  children,
  floatRight,
  caption,
}: ImageContainerProps) {
  const sx: Sx =
    type === ImageType.HalfWidthImage
      ? {
          float: floatRight ? 'right' : 'left',
          '@media (max-width: 576px)': {
            width: '100%',
          },
        }
      : {
          '@media (max-width: 576px)': {
            width: '100%',
          },
        };
  return (
    <Box
      w={type === ImageType.HalfWidthImage ? '50%' : '70%'}
      m="auto"
      display={type === ImageType.HalfWidthImage ? 'inline-block' : 'block'}
      p="15px"
      sx={sx}
    >
      <Box pos="relative" pt={`${aspectRatio * 100}%`}>
        {children}
      </Box>
      {caption && (
        <Text align="center" color="blue.1" mt="10px" mb="-10px">
          {caption}
        </Text>
      )}
    </Box>
  );
}