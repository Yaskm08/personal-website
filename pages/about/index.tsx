import { Box, Title } from '@mantine/core';

import Head from 'next/head';
import Image from 'next/image';

import {
  DocumentType,
  getAllForDocumentTypeByCreatedDate,
} from '@/src/cms/client';
import DocumentRenderer from '@/src/cms/documents/DocumentRenderer';
import PageContentBox from '@/src/components/PageContentBox';
import StarryBackground, {
  StarryBackgroundProps,
} from '@/src/components/StarryBackground';
import { AboutEntry } from '@/src/types/about';
import { getStarField } from '@/src/util/stars';

interface AboutProps extends StarryBackgroundProps {
  about: AboutEntry;
}

export default function About({ stars, about }: AboutProps) {
  return (
    <>
      <Head>
        <title>About Yassine Kraiem</title>
        <meta name="description" content="Yassine Kraiem\'s Story" />
      </Head>
      <PageContentBox>
        <Box
          pos="relative"
          pt="33.3333%"
          w="33.3333%"
          display="inline-block"
          mr="1em"
          sx={{
            float: 'left',
            '@media (max-width: 620px)': {
              paddingTop: '50%',
              width: '50%',
            },
            '@media (max-width: 400px)': {
              paddingTop: '60%',
              width: '60%',
            },
          }}
        >
          <Image
            priority
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAArACsDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAABQQGAwf/xAAlEAABAwMDBAMBAAAAAAAAAAABAAIDBAUREyExEiIjMhQzgVH/xAAYAQEAAwEAAAAAAAAAAAAAAAAFAAQGAv/EACERAAIBAwQDAQAAAAAAAAAAAAABAwIRIgQSISMxMjNB/9oADAMBAAIRAxEAPwDBthfIQACtfZICAFwjt7Q71WgtVIGgbKnrFu1Kt4NLNMqorFYiOmgLxA4tcto2m8fCFutJlp2VmHGRAqd2ecx0Lm1Lnf0pEUzsBJ/CGqdlUKLbhOT1brFOWTIrbCM8Jm2xjIRXUAUpbZBkLPzruQ1X8zQMjGmiLnGMFMRvGmhrrKMFd0/RB1AEIQZOFWIBjhTwuDpUiAMBOVrhBc9WYA+XCQtk+XDdDylX2s9wQmpXajUSrA10cviQV3nwDulY/q/EBeTsVI+ZUF+CSjl6pU013aFnrf8AZ+p9vqE7J+A8/uf/2Q=="
            style={{ borderRadius: '25px' }}
            src="/ProfilePicture.jpg"
            alt="profile"
            sizes="(min-width: 768px) 20vw,
            (win-width: 576px) 33vw,
            100vw"
            fill
          />
        </Box>
        <Title color="blue.2" align="center" underline>
          About
        </Title>
        <br />
        <DocumentRenderer document={about.body} />
      </PageContentBox>
      <StarryBackground stars={stars} />
    </>
  );
}

export async function getStaticProps() {
  const abouts: AboutEntry[] =
    await getAllForDocumentTypeByCreatedDate<AboutEntry>(DocumentType.About, 1);

  if (!abouts || abouts.length < 1) {
    throw Error('about page content not found');
  }

  return {
    props: {
      about: abouts[0],
      stars: getStarField(450),
    },
  };
}