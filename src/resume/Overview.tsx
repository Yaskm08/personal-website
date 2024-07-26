import { Avatar, Grid, Text, Timeline, TimelineItem } from '@mantine/core';

import { urlForImage } from '@/src/cms/images';

interface OverviewProps {
  career: CareerEntry[];
  education: EducationEntry[];
}

export default function Overview({ career, education }: OverviewProps) {
  return (
    <Grid>
      <Grid.Col xs={12}>
        <Text color="blue.1" size="xl" align="center" fw="bold" underline>
          Introduction
        </Text>
        <Text pt="8px" sx={{ textIndent: '30px' }}>
          If I needed to describe myself in a single sentence or phrase, I would
          say <b>life long learner</b>. Above all other descriptions or
          qualities I might claim to have, the non-stop pursuit of knowledge and
          new skills is by far the most important and is the quality I am most
          sure of.
        </Text>
        <Text pt="8px" sx={{ textIndent: '30px' }}>
        I began my academic journey at Alma College, majoring in computer science while consistently making the Dean’s List.
          My passion for learning extended beyond the classroom, leading me to engage deeply in campus life and win awards in Model United Nations and the Business Professionals of America.
        </Text>
        <Text pt="8px" sx={{ textIndent: '30px' }}>
          My career path was significantly shaped by my role as a Program Associate at The Osgood Center for International Studies in Washington, D.C., where I focused on technological advancements.
          This experience clarified my career direction, highlighting the global impact of technology and enhancing my project management skills. My dedication to software engineering and the transformative power of technology drives me to seek new challenges and opportunities. Stay tuned for more updates!
        </Text>
      </Grid.Col>
      <Grid.Col xs={12} sm={6}>
        <Text
          color="blue.1"
          size="xl"
          align="center"
          mb="15px"
          fw="bold"
          underline
        >
          Education
        </Text>
        <Timeline active={education.length}>
          {education.map(({ school, degree, major, image }) => (
            <TimelineItem
              sx={{ color: 'white' }}
              title={`${major} - ${degree}`}
              key={`${school}_${degree}`}
              bullet={
                <Avatar
                  src={urlForImage(image.asset).size(24, 24).url()}
                  size={24}
                  alt={image.alt}
                  radius="xl"
                />
              }
            >
              <Text>{school}</Text>
            </TimelineItem>
          ))}
        </Timeline>
      </Grid.Col>
      <Grid.Col xs={12} sm={6}>
        <Text
          color="blue.1"
          size="xl"
          align="center"
          mb="15px"
          fw="bold"
          underline
        >
          Career
        </Text>
        <Timeline active={career.length}>
          {career.map(({ company, title, image }) => (
            <TimelineItem
              sx={{ color: 'white' }}
              title={title}
              key={`${company}_${title}`}
              bullet={
                <Avatar
                  src={urlForImage(image.asset).size(24, 24).url()}
                  size={24}
                  alt={image.alt}
                  radius="xl"
                />
              }
            >
              <Text>{company}</Text>
            </TimelineItem>
          ))}
        </Timeline>
      </Grid.Col>
    </Grid>
  );
}