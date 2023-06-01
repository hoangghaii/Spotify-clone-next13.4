'use client';

import { useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';

import LikedButton from '@/components/buttons/LikedButton';
import MediaItem from '@/components/players/MediaItem';
import { useOnPlay, useUser } from '@/hooks';
import { Song } from '@/types';

type Props = {
  songs: Song[];
};

const LikedContent: FC<Props> = ({ songs }: Props) => {
  const router = useRouter();

  const { isLoading, user } = useUser();

  const onPlay = useOnPlay(songs);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/');
    }
  }, [isLoading, user, router]);

  if (songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No liked songs.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
      {songs.map((song) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaItem onClick={(id) => onPlay(id)} data={song} />
          </div>
          <LikedButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

export default LikedContent;
