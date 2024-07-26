import { Dispatch, SetStateAction } from 'react';

import { Carousel } from '@mantine/carousel';
import { Accordion, Badge, Box, Button, Group, Text } from '@mantine/core';

import Image from 'next/image';
import Link from 'next/link';

import { urlForImage } from '@/src/cms/images';
import { ProjectEntry } from '@/src/types/project';

interface ProjectListItemProps extends ProjectEntry {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setModalContent: Dispatch<SetStateAction<Image | null>>;
}

export default function ProjectListItem({
  slug,
  name,
  description,
  mainImage,
  tools,
  startYear,
  images,
  links,
  setModalContent,
  setModalOpen,
}: ProjectListItemProps) {
  return (
    <Accordion.Item
      value={slug.current}
      sx={(theme) => ({ backgroundColor: theme.colors.dark[6] })}
    >
      <Accordion.Control>
        <Group>
          <Box>
            <Image
              placeholder="blur"
              blurDataURL={mainImage.asset.metadata?.lqip}
              style={{ borderRadius: '8px' }}
              src={urlForImage(mainImage.asset).url()}
              alt={mainImage.alt}
              width={250}
              height={125}
            />
          </Box>
          <Box sx={{ color: 'white' }}>
            <Text size="lg" fw="bold">
              {name}
            </Text>
            <Text color="blue.2">Started {startYear}</Text>
            <Box mt="8px">
              {tools.map((tool) => (
                <Badge mr="5px" variant="filled" color="blue.6" key={tool}>
                  {tool}
                </Badge>
              ))}
            </Box>
          </Box>
        </Group>
      </Accordion.Control>
      <Accordion.Panel>
        <Box m="-10px 0 15px 0">{description}</Box>
        {images?.length && (
          <Carousel
            withControls={false}
            draggable={false}
            height={250}
            slideSize="33.333333%"
            slideGap="sm"
            breakpoints={[
              { maxWidth: 'md', slideSize: '50%' },
              { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
            ]}
            controlSize={34}
            align="start"
          >
            {images.map((image, idx) => (
              <Carousel.Slide key={`${image.asset._ref}_${idx}`}>
                <Box
                  pos="relative"
                  h="250px"
                  w="100%"
                  bg="white"
                  sx={{
                    borderRadius: '5px',
                    overflow: 'hidden',
                    '&:hover': {
                      cursor: 'pointer',
                      opacity: 0.85,
                    },
                  }}
                  onClick={() => {
                    setModalContent(image);
                    setModalOpen(true);
                  }}
                >
                  <Image
                    placeholder="blur"
                    blurDataURL={image.asset.metadata?.lqip}
                    src={urlForImage(image.asset).height(250).url()}
                    alt={image.alt}
                    sizes="(min-width: 768px) 25vw,
                    (win-width: 576px) 33vw,
                    100vw"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </Box>
              </Carousel.Slide>
            ))}
          </Carousel>
        )}
        {links && links.length && (
          <Box mt="10px" mb="10px">
            <Text component="span" size="xl" color="blue.3">
              Links:&nbsp;&nbsp;
            </Text>
            {links?.map((link) => (
              <Link key={link} href={link} target="_blank">
                <Text
                  component="span"
                  size="lg"
                  td="underline"
                  mr="20px"
                  color="blue.1"
                  sx={{
                    '&:hover': {
                      color: 'white',
                    },
                  }}
                >
                  {link.replace('https://', '')}
                </Text>
              </Link>
            ))}
          </Box>
        )}
        <Box mt="15px" ta="right">
          <Link href={`/projects/${slug.current}`}>
            <Button
              variant="default"
              color="blue.1"
              size="lg"
              sx={(theme) => ({
                color: theme.colors.blue[1],
              })}
            >
              {'Click Here to See More >>>'}
            </Button>
          </Link>
        </Box>
      </Accordion.Panel>
    </Accordion.Item>
  );
}