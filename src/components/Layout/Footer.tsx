'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react/dist/iconify.js';

import useWeb3 from '@/hooks/useWeb3';
import useToast from '@/hooks/useToast';
import StakeversesLogo from '@/assets/images/Stakeverses-logo.png';

function Footer() {
  const { isConnected } = useWeb3();
  const { showToast } = useToast();
  const router = useRouter();

  const handleCreateInstance = () => {
    if (isConnected) router.push('/create-instance/product');
    else showToast('warning', 'Please connect wallet!');
  };

  return (
    <div
      className={`relative ${
        isConnected ? 'h-[650px]' : 'h-[600px]'
      } px-[20px] bg-gradient-to-tr from-[#09B0B3] to-[#055F76] text-base xl:px-[100px] 2xl:px-[136px] xl:text-lg ${
        isConnected ? 'xl:h-[477px]' : 'xl:h-[427px]'
      } ${isConnected ? 'lg:h-[450px]' : 'lg:h-[400px]'} md:px-[70px] ${
        isConnected ? 'md:h-[600px]' : 'md:h-[550px]'
      } dark:bg-gradient-footer`}
    >
      <div className="grid grid-cols-12 gap-6 xl:gap-10 2xl:gap-16">
        <div className="grid col-span-12 lg:col-span-4">
          <Link className="mt-9" href="/">
            <Image
              src={StakeversesLogo}
              className="-ml-10"
              alt="Stakeverses Logo"
              width={358}
              height={93}
              priority
            />
          </Link>
          <div className={`flex flex-col gap-4 ${isConnected && 'mt-10'}`}>
            <h3 className="font-medium">Pages</h3>
            <Link href={'/stakes'}>Stakes</Link>
            {isConnected && <Link href={'/my-portfolio'}>My Portfolio</Link>}
            <div
              className="truncate cursor-pointer"
              onClick={handleCreateInstance}
            >
              Create Instance
            </div>
            <Link href={'/faq'}>FAQ</Link>
          </div>
        </div>
        <div className="grid col-span-7 lg:col-span-4 md:col-span-4">
          <h3 className="font-medium mt-6 lg:mt-28">Contact us</h3>
          <div className="flex flex-row items-center gap-2 mt-6">
            <Icon icon="ic:round-mail" width="32" height="32" />
            <a href="mailto:factorycenter1155@gmail.com">
              factorycenter1155@gmail.com
            </a>
          </div>
        </div>
        <div className="grid col-span-12 lg:col-span-4 md:col-span-8">
          <div className="flex flex-row justify-start items-end gap-4 md:justify-end z-20">
            <Link href="https://discord.com/invite/7aKVRegu3X" target="_blank">
              <Icon
                className="p-1.5 rounded-full border-2 border-black cursor-pointer dark:border-[#00cfc9]"
                icon="bxl:discord-alt"
                width="54"
                height="54"
              />
            </Link>
            <Link href="https://twitter.com/factorygame_org" target="_blank">
              <Icon
                className="p-1.5 rounded-full border-2 border-black cursor-pointer dark:border-cyan"
                icon="uil:twitter"
                width="54"
                height="54"
              />
            </Link>
            <Icon
              className="p-1.5 rounded-full border-2 border-black cursor-pointer dark:border-cyan"
              icon="ri:telegram-2-fill"
              width="54"
              height="54"
            />
            <Icon
              className="p-2.5 rounded-full border-2 border-black cursor-pointer dark:border-cyan"
              icon="fa:book"
              width="54"
              height="54"
            />
          </div>
        </div>
      </div>
      <hr className="absolute inset-x-0 bg-[#D2D2D2] w-full mb-[72px] bottom-0 xl:mb-[76px]" />
      <p className="absolute inset-x-0 w-full text-center bottom-0 py-6">
        Copyright&copy; {new Date().getFullYear()} Stakeverses
      </p>
    </div>
  );
}

export default Footer;
