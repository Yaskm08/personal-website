import { ReactNode } from 'react';

import { Box, Tabs } from '@mantine/core';

import Head from 'next/head';

import {
  DocumentType,
  Order,
  OrderBy,
  getAllForDocumentTypeOrdered,
} from '@/src/cms/client';
import PageContentBox from '@/src/components/PageContentBox';
import StarryBackground, {
  StarryBackgroundProps,
} from '@/src/components/StarryBackground';
import ResumeOverview from '@/src/icons/ResumeOverview.svg';
import School from '@/src/icons/School.svg';
import Work from '@/src/icons/Work.svg';
import CareerSummary from '@/src/resume/CareerSummary';
import Education from '@/src/resume/Education';
import Overview from '@/src/resume/Overview';
import { getStarField } from '@/src/util/stars';
import { DAYS } from '@/src/util/time';

interface Tab {
  label: string;
  value: string;
  icon: ReactNode;
  content: (education: EducationEntry[], career: CareerEntry[]) => ReactNode;
}

const tabs: Tab[] = [
  {
    label: 'Overview',
    value: 'overview',
    icon: <ResumeOverview />,
    content: (education, career) => (
      <Overview education={education} career={career} />
    ),
  },
  {
    label: 'Education',
    value: 'education',
    icon: <School />,
    content: (education) => <Education education={education} />,
  },
  {
    label: 'Career Summary',
    value: 'career_summary',
    icon: <Work />,
    content: (_, career) => <CareerSummary career={career} />,
  },
];

interface ResumeProps extends StarryBackgroundProps {
  career: CareerEntry[];
  education: EducationEntry[];
}

export default function Resume({ stars, career, education }: ResumeProps) {
  return (
    <>
      <Head>
        <title>Resume - Yassine Kraiem</title>
        <meta name="description" content="Yassine Kraiem\'s Resume" />
      </Head>
      <PageContentBox>
        <Tabs variant="pills" defaultValue="overview">
          <Tabs.List position="center" grow>
            {tabs.map(({ label, value, icon }) => (
              <Tabs.Tab
                key={value}
                value={value}
                sx={{ fontWeight: 'bold', fontSize: '20px', color: 'white' }}
                icon={icon}
              >
                {label}
              </Tabs.Tab>
            ))}
          </Tabs.List>
          {tabs.map(({ value, content }) => (
            <Tabs.Panel key={value} value={value}>
              <Box pt="20px">{content(education, career)}</Box>
            </Tabs.Panel>
          ))}
        </Tabs>
      </PageContentBox>
      <StarryBackground stars={stars} />
    </>
  );
}

export async function getStaticProps() {
  const career: CareerEntry[] = await getAllForDocumentTypeOrdered<CareerEntry>(
    DocumentType.Career,
    OrderBy.EndYear,
    Order.DESC
  );

  const education: EducationEntry[] =
    await getAllForDocumentTypeOrdered<EducationEntry>(
      DocumentType.Education,
      OrderBy.EndYear,
      Order.DESC
    );

  if (!education || !career || education.length < 1 || career.length < 1) {
    throw Error('Failed to fetch education or career entries');
  }

  return {
    props: {
      career,
      education,
      stars: getStarField(350),
    },
    revalidate: 90 * DAYS,
  };
}