import { useAuthModal, usePlayer, useSubscribeModal, useUser } from '@/hooks';
import { Song } from '@/types';

export const useOnPlay = (songs: Song[]) => {
  const { setIds, setId } = usePlayer();

  const subscribeModal = useSubscribeModal();

  const authModal = useAuthModal();

  const { subscription, user } = useUser();

  const onPlay = (id: string) => {
    if (!user) {
      return authModal.onOpen();
    }

    if (!subscription) {
      return subscribeModal.onOpen();
    }

    setId(id);
    setIds(songs.map((song) => song.id));
  };

  return onPlay;
};
