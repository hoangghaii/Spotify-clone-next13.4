'use client';

import { FC } from 'react';

import { Song } from '@/types';

type Props = {
  songs: Song[];
};

const PageContent: FC<Props> = ({ songs }: Props) => {
  return <div>List of songs</div>;
};

export default PageContent;
