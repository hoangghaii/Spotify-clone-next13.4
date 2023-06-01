import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { cache } from 'react';

import { getSongs } from '@/actions';
import { Song } from '@/types';

export const getSongsByTitle = cache(async (title: string): Promise<Song[]> => {
  try {
    const supabase = createServerComponentClient({
      cookies: cookies,
    });

    if (!title) {
      const allSongs = await getSongs();
      return allSongs;
    }

    const { data, error } = await supabase
      .from('songs')
      .select('*')
      .ilike('title', `%${title}%`)
      .order('created_at', { ascending: false });

    if (error) {
      console.log(error.message);
    }

    return (data as Song[]) || [];
  } catch (error) {
    console.log(error);
    return [];
  }
});
