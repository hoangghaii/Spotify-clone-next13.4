'use client';

import { FC } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { TbPlaylist } from 'react-icons/tb';

import MediaItem from '@/components/players/MediaItem';
import {
  useAuthModal,
  useOnPlay,
  useSubscribeModal,
  useUploadModal,
  useUser,
} from '@/hooks';
import { Song } from '@/types';

type Props = {
  songs: Song[];
};

const Library: FC<Props> = ({ songs }: Props) => {
  const subscribeModal = useSubscribeModal();

  const authModal = useAuthModal();

  const uploadModal = useUploadModal();

  const { user, subscription } = useUser();

  const onPlay = useOnPlay(songs);

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (!subscription) {
      return subscribeModal.onOpen();
    }

    return uploadModal.onOpen();
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className="text-neutral-400" size={26} />
          <p className="text-neutral-400 font-medium text-md uppercase">
            your library
          </p>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {songs.map((song) => (
          <MediaItem
            key={song.id}
            onClick={(id: string) => onPlay(id)}
            data={song}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
