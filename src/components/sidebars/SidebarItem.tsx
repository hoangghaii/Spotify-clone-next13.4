import Link from 'next/link';
import { FC } from 'react';
import { IconType } from 'react-icons/lib';
import { twMerge } from 'tailwind-merge';

type Props = {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
};

const SidebarItem: FC<Props> = ({ icon: Icon, label, active, href }: Props) => {
  return (
    <Link
      href={href}
      className={twMerge(
        `flex flex-row h-auto items-center 
        w-full gap-x-4 text-md font-medium 
        cursor-pointer hover:text-white transition 
        text-neutral-400 py-1`,
        active && 'text-white'
      )}
    >
      <Icon size={26} />
      <p className="truncate w-100">{label}</p>
    </Link>
  );
};

export default SidebarItem;
