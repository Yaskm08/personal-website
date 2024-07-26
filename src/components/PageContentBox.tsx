import { PropsWithChildren } from 'react';

import { Box } from '@mantine/core';

export default function PageContentBox({ children }: PropsWithChildren) {
  return (
    <Box
      pos="absolute"
      top="100px"
      left="50%"
      maw="960px"
      w="100%"
      h="calc(100% - 200px)"
      p="1em"
      sx={(theme) => ({
        transform: 'translateX(-50%)',
        backgroundColor: theme.colors.alphaDarkBlue[9],
        borderRadius: '15px',
        zIndex: 1,
        color: 'white',
        overflowY: 'auto',
        '@media (max-width: 620px)': {
          height: 'calc(100% - 100px)',
        },
      })}
    >
      {children}
    </Box>
  );
}