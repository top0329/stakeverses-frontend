'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { ConnectWallet } from '@/components/Buttons/ConnectButton';
import useWeb3 from '@/hooks/useWeb3';
import useToast from '@/hooks/useToast';
import StakeversesLogo from '@/assets/images/Stakeverses-logo.png';

function Header() {
  const { isConnected } = useWeb3();
  const { showToast } = useToast();
  const router = useRouter();
  const path = usePathname();

  const [activeItem, setActiveItem] = useState<number>(0);

  useEffect(() => {
    path.includes('stakes') && setActiveItem(1);
    path.includes('my-portfolio') && setActiveItem(2);
    path.includes('create-instance') && setActiveItem(3);
    path.includes('faq') && setActiveItem(4);
    path === '/' && setActiveItem(0);
  }, [path, setActiveItem]);

  const handleCreateInstance = () => {
    if (isConnected) {
      router.push('/create-instance/product');
      setActiveItem(3);
    } else showToast('warning', 'Please connect wallet!');
  };

  return (
    <div className="flex justify-between items-center h-[68px] mx-[20px] my-[20px] bg-white bg-opacity-15 rounded-full border border-white border-opacity-30 2xl:h-[98px] 2xl:mx-[130px] 2xl:my-[51px] xl:h-[88px] xl:mx-[100px] xl:my-[46px] lg:h-[78px] lg:mx-[70px] lg:my-[40px] md:h-[68px] md:my-[40px]">
      <Link href="/" onClick={() => setActiveItem(0)}>
        <Image
          src={StakeversesLogo}
          className="ml-0 w-[180px] h-[54px] lg:w-[230px] lg:h-[72px] xl:w-[280px] xl:h-[80px] 2xl:ml-[15px] 2xl:w-[358px] 2xl:h-[93px] md:ml-[10px]"
          alt="Stakeverses Logo"
          priority
        />
      </Link>
      <div className="hidden justify-center items-center text-lg gap-2 mr-[10px] 2xl:mr-[15px] 2xl:gap-8 2xl:text-2xl xl:gap-6 xl:text-xl lg:gap-4 md:flex">
        <Link
          className={`truncate cursor-pointer ${
            activeItem === 1
              ? 'font-semibold text-[#26DDFF] space-y-0.5'
              : 'font-medium'
          }`}
          href="/stakes"
          onClick={() => setActiveItem(1)}
        >
          Stakes
          {activeItem === 1 && (
            <div className="border border-[#26DDFF] w-full"></div>
          )}
        </Link>
        {isConnected && (
          <Link
            className={`truncate cursor-pointer ${
              activeItem === 2
                ? 'font-semibold text-[#26DDFF] space-y-0.5'
                : 'font-medium'
            }`}
            href="/my-portfolio"
            onClick={() => setActiveItem(2)}
          >
            My Portfolio
            {activeItem === 2 && (
              <div className="border border-[#26DDFF] w-full"></div>
            )}
          </Link>
        )}
        <div
          className={`truncate cursor-pointer ${
            activeItem === 3
              ? 'font-semibold text-[#26DDFF] space-y-0.5'
              : 'font-medium'
          }`}
          onClick={handleCreateInstance}
        >
          Create Instance
          {activeItem === 3 && (
            <div className="border border-[#26DDFF] w-full"></div>
          )}
        </div>
        <Link
          className={`truncate cursor-pointer ${
            activeItem === 4
              ? 'font-semibold text-[#26DDFF] space-y-0.5'
              : 'font-medium'
          }`}
          href="/faq"
          onClick={() => setActiveItem(4)}
        >
          FAQ
          {activeItem === 4 && (
            <div className="border border-[#26DDFF] w-full"></div>
          )}
        </Link>
        <ConnectWallet />
      </div>
      <button className="block mr-6 md:hidden">
        <hr className="w-7 border" />
        <hr className="w-7 border mt-2" />
      </button>
    </div>
  );
}

export default Header;
