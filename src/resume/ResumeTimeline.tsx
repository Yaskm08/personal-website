import { PropsWithChildren } from 'react';

import { Grid, Text, Timeline } from '@mantine/core';

interface ResumeTimelineProps extends PropsWithChildren {
  active: number;
}

export default function ResumeTimeline({
  children,
  active,
}: ResumeTimelineProps) {
  return (
    <Grid.Col xs={12} sm={6}>
      <Text
        align="center"
        size="xl"
        fw="bold"
        color="blue.2"
        mb="20px"
        underline
      >
        Timeline (click for more details)
      </Text>
      <Timeline active={active} ml="10px">
        {children}
      </Timeline>
    </Grid.Col>
  );
}