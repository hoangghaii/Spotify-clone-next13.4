'use client';

import { FC, useEffect, useState } from 'react';

import AuthModal from '@/components/modals/AuthModal';
import SubscribeModal from '@/components/modals/SubscribeModal';
import UploadModal from '@/components/modals/UploadModal';
import { ProductWithPrice } from '@/types';

type Props = {
  products: ProductWithPrice[];
};

const ModalProvider: FC<Props> = ({ products }: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <UploadModal />
      <SubscribeModal products={products} />
    </>
  );
};

export default ModalProvider;
