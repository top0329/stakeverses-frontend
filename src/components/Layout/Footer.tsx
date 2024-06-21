'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import useWeb3 from '@/hooks/useWeb3';
import useToast from '@/hooks/useToast';
import StakeversesLogo from '@/assets/images/Stakeverses-logo.png';
import FacebookFooterImage from '@/assets/images/facebook-footer.png';
import InstagramFooterImage from '@/assets/images/instagram-footer.png';
import TwitterFooterImage from '@/assets/images/twitter-footer.png';
import LinkedinFooterImage from '@/assets/images/linkedin-footer.png';

function Footer() {
  const { isConnected } = useWeb3();
  const { showToast } = useToast();
  const router = useRouter();

  const handleCreateInstance = () => {
    if (isConnected) router.push('/create-instance/product');
    else showToast('warning', 'Please connect wallet!');
  };

  return (
    <div className="relative h-[700px] px-[20px] bg-gradient-to-tr from-[#09B0B3] to-[#055F76] text-base xl:px-[100px] 2xl:px-[136px] xl:text-lg xl:h-[477px] lg:h-[450px] md:px-[70px] md:h-[600px] dark:bg-gradient-footer">
      <div className="grid grid-cols-12 gap-6 xl:gap-10 2xl:gap-16">
        <div className="grid col-span-12 gap-y-10 lg:col-span-3 lg:gap-y-20">
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
          <div>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
            <p className="mt-6 lg:mt-16">@Lorem</p>
          </div>
        </div>
        <div className="grid col-span-5 lg:col-span-2 md:col-span-3">
          <h3 className="font-medium mt-6 lg:mt-28">Pages</h3>
          <div className={`flex flex-col gap-4 ${isConnected && 'mt-10'}`}>
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
        <div className="grid col-span-7 lg:col-span-3 md:col-span-4">
          <h3 className="font-medium mt-6 lg:mt-28">Contact us</h3>
          <div className="flex flex-col gap-8 mt-6">
            <h5>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </h5>
            <h5>+1 234 567 8900</h5>
          </div>
        </div>
        <div className="grid col-span-12 lg:col-span-4 md:col-span-5">
          <div className="flex flex-row justify-start items-end gap-4 md:justify-end">
            <Link href={'#'}>
              <Image
                className="min-w-[45px] max-w-[45px] h-[45px]"
                src={FacebookFooterImage}
                alt="facebook-icon"
              />
            </Link>
            <Link href={'#'}>
              <Image
                className="min-w-[45px] max-w-[45px] h-[45px]"
                src={InstagramFooterImage}
                alt="instagram-icon"
              />
            </Link>
            <Link href={'#'}>
              <Image
                className="min-w-[45px] max-w-[45px] h-[45px]"
                src={TwitterFooterImage}
                alt="twitter-icon"
              />
            </Link>
            <Link href={'#'}>
              <Image
                className="min-w-[45px] max-w-[45px] h-[45px]"
                src={LinkedinFooterImage}
                alt="linkedin-icon"
              />
            </Link>
          </div>
        </div>
      </div>
      <hr className="absolute inset-x-0 bg-[#D2D2D2] w-full mb-[72px] bottom-0 xl:mb-[85px]" />
      <p className="absolute inset-x-0 w-full text-center bottom-0 py-6 xl:py-8">
        Copyright&copy; {new Date().getFullYear()} Stakeverses
      </p>
    </div>
  );
}

export default Footer;
