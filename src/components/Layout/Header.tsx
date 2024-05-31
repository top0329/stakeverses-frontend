'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { ConnectWallet } from '@/components/Buttons/ConnectButton';
import useWeb3 from '@/hooks/useWeb3';
import useToast from '@/hooks/useToast';
import StakeversesLogo from '@/assets/images/Stakeverses-logo.png';

function Header() {
  const { isConnected } = useWeb3();
  const { showToast } = useToast();
  const router = useRouter();

  const [activeItem, setActiveItem] = useState<number>(0);

  const handleCreateInstance = () => {
    if (isConnected) {
      router.push('/create-instance/product');
      setActiveItem(3);
    } else showToast('warning', 'Please connect wallet!');
  };

  return (
    <div className="flex justify-between items-center h-[98px] mx-[130px] my-[51px] bg-white bg-opacity-15 rounded-full border border-white border-opacity-30">
      <Link href="/">
        <Image
          src={StakeversesLogo}
          className="ml-[15px]"
          alt="Stakeverses Logo"
          width={358}
          height={93}
          priority
        />
      </Link>
      <div className="flex justify-center items-center gap-8 mr-[15px]">
        <Link
          className={`text-2xl truncate cursor-pointer ${
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
            className={`text-2xl truncate cursor-pointer ${
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
          className={`text-2xl truncate cursor-pointer ${
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
          className={`text-2xl truncate cursor-pointer ${
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
    </div>
  );
}

export default Header;
