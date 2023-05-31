'use client';

import { usePathname } from 'next/navigation';
import { FC, useMemo } from 'react';
import { BiSearch } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';

import Box from '@/components/commons/Box';
import SidebarItem from '@/components/sidebars/SidebarItem';
import { Song } from '@/types';

import Library from '../players/Library';

type Props = {
  children: React.ReactNode;
  songs: Song[];
};

const Sidebar: FC<Props> = ({ children, songs }: Props) => {
  const pathName = usePathname();

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: 'Home',
        active: pathName !== '/search',
        href: '/',
      },
      {
        icon: BiSearch,
        label: 'Search',
        active: pathName === '/search',
        href: '/search',
      },
    ],
    [pathName]
  );

  return (
    <div className="flex h-full">
      <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library songs={songs} />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  );
};

export default Sidebar;
