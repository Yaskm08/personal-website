import { Box, Menu, Text } from '@mantine/core';

import Image from 'next/image';
import Link from 'next/link';

import About from '@/src/icons/About.svg';
import CaretDown from '@/src/icons/CaretDown.svg';
import Github from '@/src/icons/Github.svg';
import LinkedIn from '@/src/icons/LinkedIn.svg';
import Projects from '@/src/icons/Project.svg';
import Resume from '@/src/icons/Resume.svg';

const headerImageStyles = { backgroundColor: '#212121', borderRadius: '50%' };

export const navButtons = [
  { label: 'About', path: '/about', Icon: About },
  { label: 'Resume', path: '/resume', Icon: Resume },
  { label: 'Projects', path: '/projects', Icon: Projects },
];

export default function Header() {
  return (
    <Box component="header">
      <Box display="inline-block" pos="relative" w="60px">
        <Link href="/">
          <Image
            priority
            style={{ ...headerImageStyles, borderRadius: '10px' }}
            src="/Logo.png"
            alt="logo"
            height={56}
            width={48}
          />
        </Link>
      </Box>
      <Menu trigger="hover" position="bottom-start">
        <Menu.Target>
          <Box component="span">
            <CaretDown
              style={{
                verticalAlign: 'middle',
                backgroundColor: '#212427',
                borderRadius: '50%',
              }}
            />
          </Box>
        </Menu.Target>
        <Menu.Dropdown sx={{ '& a': { color: 'white' } }}>
          {navButtons.map(({ label, path, Icon }) => (
            <Menu.Item key={label} href={path} component={Link}>
              <Icon
                style={{
                  display: 'inline-block',
                  position: 'relative',
                  top: '5px',
                }}
              />
              <Text display="inline-block" ml="10px" size="xl">
                {label}
              </Text>
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
      <Box
        component="span"
        sx={{
          float: 'right',
          lineHeight: '56px',
          '& svg': {
            margin: '0 10px',
            verticalAlign: 'middle',
          },
        }}
      >
        <Link
          target="_blank"
          href="https://www.linkedin.com/in/yassine-kraiem-yaskm897656/"
        >
          <LinkedIn style={headerImageStyles} />
        </Link>
        <Link target="_blank" href="https://github.com/Yaskm08">
          <Github style={headerImageStyles} />
        </Link>
      </Box>
    </Box>
  );
}