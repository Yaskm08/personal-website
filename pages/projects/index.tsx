import Fuse from 'fuse.js';
import { ChangeEvent, useState } from 'react';

import {
  Accordion,
  AccordionProps,
  ActionIcon,
  Box,
  Divider,
  Grid,
  GridProps,
  Group,
  Modal,
  Text,
  TextInput,
} from '@mantine/core';

import Head from 'next/head';
import NextImage from 'next/image';

import { DocumentType, getAllForDocumentType } from '@/src/cms/client';
import { urlForImage } from '@/src/cms/images';
import PageContentBox from '@/src/components/PageContentBox';
import StarryBackground,
{
  StarryBackgroundProps,
}
from '@/src/components/StarryBackground';
import DownChevron from '@/src/icons/DownChevron.svg';
import GridView from '@/src/icons/GridView.svg';
import ListView from '@/src/icons/ListView.svg';
import Search from '@/src/icons/Search.svg';
import ProjectGridItem from '@/src/projects/ProjectGridItem';
import ProjectListItem from '@/src/projects/ProjectListItem';
import { ProjectEntry } from '@/src/types/project';
import { getStarField } from '@/src/util/stars';
import { DAYS } from '@/src/util/time';

enum ProjectView {
  List,
  Grid,
}

interface ProjectsProps extends StarryBackgroundProps {
  projects: ProjectEntry[];
}

export default function Projects({ stars, projects }: ProjectsProps) {
  const [currentProjects, setCurrentProjects] =
    useState<ProjectEntry[]>(projects);
  const [projectsFuse] = useState<Fuse<ProjectEntry>>(
    new Fuse(projects, { keys: ['name', 'description', 'startYear'] })
  );
  const [projectView, setProjectView] = useState<ProjectView>(ProjectView.List);
  const [search, setSearch] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<Image | null>(null);
  const Wrapper = projectView === ProjectView.List ? Accordion : Grid;
  const wrapperProps =
    projectView === ProjectView.List
      ? { chevron: <DownChevron />, chevronSize: 40, variant: 'filled' }
      : {};

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (!value) {
      setSearch(value);
      setCurrentProjects(projects);
      return;
    }
    setSearch(value);
    setCurrentProjects(projectsFuse.search(value).map((res) => res.item));
  };

  return (
    <>
      <Head>
        <title>Projects - Yassine Kraiem</title>
        <meta name="description" content="Yassine Kraiem\'s Projects" />
      </Head>
      <Modal
        size="lg"
        centered
        opened={modalOpen}
        onClose={setModalOpen.bind(null, false)}
      >
        {modalContent && (
          <Box
            bg="white"
            pos="relative"
            pt={`${
              (1 / (modalContent.asset.metadata?.dimensions.aspectRatio || 1)) *
              100
            }%`}
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
        <Grid>
          <Grid.Col xs={12} sm={4} sx={{ height: '62px' }}>
            <Group noWrap position="apart">
              <Text
                size="xl"
                color="blue.2"
                underline
                fw="bold"
                display="inline-block"
              >
                Projects
              </Text>
              <Box>
                <ActionIcon
                  onClick={setProjectView.bind(null, ProjectView.List)}
                  mr="10px"
                  display="inline-block"
                  color="blue"
                  size={42}
                  variant={
                    projectView === ProjectView.List ? 'filled' : 'light'
                  }
                >
                  <ListView />
                </ActionIcon>
                <ActionIcon
                  onClick={setProjectView.bind(null, ProjectView.Grid)}
                  display="inline-block"
                  color="blue"
                  size={42}
                  variant={
                    projectView === ProjectView.Grid ? 'filled' : 'light'
                  }
                >
                  <GridView />
                </ActionIcon>
              </Box>
            </Group>
          </Grid.Col>
          <Grid.Col xs={12} sm={8} sx={{ height: '62px' }}>
            <TextInput
              maw="300px"
              m="6px auto 0 auto"
              placeholder="Search..."
              rightSection={<Search />}
              value={search}
              onChange={handleSearchChange}
            />
          </Grid.Col>
        </Grid>
        <Divider m="15px 0" color="blue" />
        <Wrapper {...(wrapperProps as AccordionProps & GridProps)}>
          {currentProjects.map((project) =>
            projectView === ProjectView.List ? (
              <ProjectListItem
                key={project.slug.current}
                setModalOpen={setModalOpen}
                setModalContent={setModalContent}
                {...project}
              />
            ) : (
              <ProjectGridItem
                key={project.slug.current}
                setModalOpen={setModalOpen}
                setModalContent={setModalContent}
                {...project}
              />
            )
          )}
        </Wrapper>
      </PageContentBox>
      <StarryBackground stars={stars} />
    </>
  );
}

export async function getStaticProps() {
  const projects: ProjectEntry[] = await getAllForDocumentType<ProjectEntry>(
    DocumentType.Project
  );

  if (!projects || projects.length < 1) {
    throw Error('No projects found for /projects');
  }

  return {
    props: {
      projects,
      stars: getStarField(350),
    },
    revalidate: 3 * DAYS,
  };
}