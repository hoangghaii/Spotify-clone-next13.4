import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { cache } from 'react';

import { Song } from '@/types';

export const getLikedSongs = cache(async (): Promise<Song[]> => {
  try {
    const supabase = createServerComponentClient({
      cookies: cookies,
    });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    const { data, error } = await supabase
      .from('liked_songs')
      .select('*, songs(*)')
      .eq('user_id', session?.user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.log(error.message);
    }

    if (!data) return [];

    return data.map((item) => ({
      ...item.songs,
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
});
