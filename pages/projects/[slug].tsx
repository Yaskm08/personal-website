import { useState } from 'react';

import { Carousel } from '@mantine/carousel';
import {
  Badge,
  Box,
  Grid,
  LoadingOverlay,
  Modal,
  Text,
  Title,
} from '@mantine/core';

import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import NextImage from 'next/image';
import { useRouter } from 'next/router';

import {
  DocumentType,
  getAllForDocumentType,
  getProjectForSlug,
} from '@/src/cms/client';
import DocumentRenderer from '@/src/cms/documents/DocumentRenderer';
import { urlForImage } from '@/src/cms/images';
import PageContentBox from '@/src/components/PageContentBox';
import StarryBackground, {
  StarryBackgroundProps,
} from '@/src/components/StarryBackground';
import { ProjectEntry } from '@/src/types/project';
import { getStarField } from '@/src/util/stars';

interface ProjectProps extends StarryBackgroundProps {
  project: ProjectEntry;
}

export default function Project({ project, stars }: ProjectProps) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<Image | null>(null);

  const title = !router.isFallback
    ? `Project: ${project.name}`
    : 'Yassine Kraiem - Project';
  return (
    <>
      {!router.isFallback && (
        <Head>
          <title>{title}</title>
          <meta
            name="description"
            content={`A project by Yassine Kraiem named ${project.name}`}
          />
        </Head>
      )}
      <Modal
        size="lg"
        centered
        opened={modalOpen}
        onClose={setModalOpen.bind(null, false)}
      >
        {modalContent && (
          <Box
            pos="relative"
            pt={`${
              (1 / (modalContent.asset.metadata?.dimensions.aspectRatio || 1)) *
              100
            }%`}
            bg="white"
            sx={{ borderRadius: '5px' }}
          >
            <NextImage
              placeholder="blur"
              blurDataURL={modalContent.asset.metadata?.lqip}
              src={urlForImage(modalContent.asset).url()}
              alt={modalContent.alt}
              fill
            />
          </Box>
        )}
      </Modal>
      <PageContentBox>
        <LoadingOverlay visible={router.isFallback} />
        {!router.isFallback && (
          <>
            <Grid>
              <Grid.Col xs={12} md={7}>
                <Title fw="bold" underline>
                  {project.name}
                </Title>
                <Box mt="12px">
                  {project.tools.map((tool) => (
                    <Badge
                      mr="5px"
                      mt="5px"
                      variant="filled"
                      color="blue.6"
                      size="lg"
                      key={tool}
                    >
                      {tool}
                    </Badge>
                  ))}
                </Box>
                <Text mt="15px" size="lg" color="blue.1">
                  Started {project.startYear}
                </Text>
              </Grid.Col>
              <Grid.Col pos="relative" xs={12} md={5}>
                <Box pos="relative" w="100%" pt="50%" mb="15px">
                  <Image
                    style={{ borderRadius: '5px' }}
                    placeholder="blur"
                    blurDataURL={project.mainImage.asset.metadata?.lqip}
                    src={urlForImage(project.mainImage.asset).url()}
                    alt={project.mainImage.alt}
                    fill
                    sizes="(min-width: 768px) 75vw,
                    (win-width: 576px) 90vw,
                    100vw"
                  />
                </Box>
              </Grid.Col>
            </Grid>
            <DocumentRenderer document={project.body} />
          </>
        )}
        {project?.images?.length && (
          <>
            <Text size="xl" color="blue.2" ta="center" mb="10px">
              Pictures
            </Text>
            <Carousel
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
              {project.images.map((image, idx) => (
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
          </>
        )}
      </PageContentBox>
      <StarryBackground stars={stars} />
    </>
  );
}

export async function getStaticPaths() {
  const projects: ProjectEntry[] = await getAllForDocumentType<ProjectEntry>(
    DocumentType.Project
  );

  if (!projects || projects.length < 1) {
    throw Error('No projects found for /projects');
  }

  return {
    paths: projects.map(({ slug }) => ({
      params: { slug: slug.current },
    })),
    fallback: true,
  };
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const slug = ctx.params?.slug;
  if (!slug) throw Error('Slug not found for /projects/{slug}');

  const project = await getProjectForSlug<ProjectEntry>(slug as string);

  if (!project || Object.keys(project).length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      project,
      stars: getStarField(350),
    },
  };
}