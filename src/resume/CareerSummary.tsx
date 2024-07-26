import { useState } from 'react';

import { Avatar, Grid, Text } from '@mantine/core';

import Image from 'next/image';

import { urlForImage } from '@/src/cms/images';
import ResumeItemDetails from '@/src/resume/ResumeItemDetails';
import ResumeTimeline from '@/src/resume/ResumeTimeline';
import ResumeTimelineItem from '@/src/resume/ResumeTimelineItem';

interface CareerOverviewProps {
  career: CareerEntry[];
}

export default function CareerSummary({ career }: CareerOverviewProps) {
  const [activeCareer, setActiveCareer] = useState<number>(0);
  const details = career[activeCareer];
  return (
    <Grid>
      <ResumeTimeline active={activeCareer}>
        {career.map(
          (
            { company, title, startYear, endYear, department, team, image },
            idx
          ) => (
            <ResumeTimelineItem
              onClick={setActiveCareer.bind(null, idx)}
              key={`${company}_${title}`}
              title={title}
              bullet={
                <Avatar
                  onClick={setActiveCareer.bind(null, idx)}
                  src={urlForImage(image.asset).size(40, 40).url()}
                  radius="xl"
                  alt={image.alt}
                  size={activeCareer === idx ? 40 : 22}
                />
              }
            >
              <Text>{company}</Text>
              {department && team && (
                <Text>
                  {department} - {team}
                </Text>
              )}
              <Text>
                {startYear} - {endYear === 9999 ? 'Present' : endYear}
              </Text>
            </ResumeTimelineItem>
          )
        )}
      </ResumeTimeline>
      <ResumeItemDetails
        link={details.image.link}
        image={
          <Image
            placeholder="blur"
            blurDataURL={details.image.asset.metadata?.lqip}
            sizes="(min-width: 768px) 20vw,
            (win-width: 576px) 25vw,
            100vw"
            style={{ borderRadius: '25px' }}
            src={urlForImage(details.image.asset).url()}
            alt={details.image.alt}
            fill
          />
        }
        description={details.description}
      />
    </Grid>
  );
}