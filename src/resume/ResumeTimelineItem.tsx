import { TimelineItem, TimelineItemProps } from '@mantine/core';

export default function ResumeTimelineItem({
  children,
  ...props
}: TimelineItemProps) {
  return (
    <TimelineItem
      sx={(theme) => ({
        color: 'white',
        borderRadius: '10px',
        '&:hover': {
          cursor: 'pointer',
          backgroundColor: theme.colors.blue[9],
        },
      })}
      {...props}
    >
      {children}
    </TimelineItem>
  );
}