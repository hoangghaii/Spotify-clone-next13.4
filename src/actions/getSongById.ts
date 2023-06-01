import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { cache } from 'react';

import { Song } from '@/types';

export const getSongById = cache(async (id: string): Promise<Song[]> => {
  try {
    const supabase = createServerComponentClient({
      cookies: cookies,
    });

    const { data, error } = await supabase
      .from('songs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.log(error.message);
    }

    return (data as Song[]) || [];
  } catch (error) {
    console.log(error);
    return [];
  }
});
