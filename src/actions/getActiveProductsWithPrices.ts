import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { cache } from 'react';

import { ProductWithPrice } from '@/types';

export const getActiveProductsWithPrices = cache(
  async (): Promise<ProductWithPrice[]> => {
    try {
      const supabase = createServerComponentClient({
        cookies: cookies,
      });

      const { data, error } = await supabase
        .from('products')
        .select('*, prices(*)')
        .eq('active', true)
        .eq('prices.active', true)
        .order('metadata->index')
        .order('unit_amount', { foreignTable: 'prices' });

      if (error) {
        console.log(error.message);
      }

      return (data as ProductWithPrice[]) || [];
    } catch (error) {
      console.log(error);
      return [];
    }
  }
);
