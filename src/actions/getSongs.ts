import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { cache } from 'react';

import { Song } from '@/types';

export const getSongs = cache(async (): Promise<Song[]> => {
  try {
    const supabase = createServerComponentClient({
      cookies: cookies,
    });

    const { data, error } = await supabase
      .from('songs')
      .select('*')
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
