import { PropsWithChildren } from 'react';

import { Box } from '@mantine/core';

export default function ListContainer({ children }: PropsWithChildren) {
  return (
    <Box
      display="inline-block"
      w="75%"
      m="15px auto"
      pos="relative"
      left="50%"
      sx={{
        transform: 'translateX(-50%)',
        '@media (max-width: 576px)': {
          width: '85%',
        },
      }}
    >
      {children}
    </Box>
  );
}