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
    <div className="relative h-[477px] px-[136px] bg-gradient-footer text-lg">
      <div className="grid grid-cols-12 gap-16">
        <div className="grid col-span-4 gap-y-10">
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
            <p className="mt-16 text-lg">@Lorem</p>
          </div>
        </div>
        <div className="grid col-span-2 text-lg">
          <h3 className="font-medium mt-28">Pages</h3>
          <div className={`flex flex-col gap-4 ${isConnected && 'mt-10'}`}>
            <Link href={'/stakes'}>Stakes</Link>
            {isConnected && <Link href={'/my-portfolio'}>My Portfolio</Link>}
            <div className="cursor-pointer" onClick={handleCreateInstance}>
              Create Instance
            </div>
            <Link href={'/faq'}>FAQ</Link>
          </div>
        </div>
        <div className="grid col-span-3">
          <h3 className="font-medium mt-28">Contact us</h3>
          <div className="flex flex-col gap-8 mt-6">
            <h5>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </h5>
            <h5>+1 234 567 8900</h5>
          </div>
        </div>
        <div className="grid col-span-3">
          <div className="flex flex-row justify-end items-end gap-4">
            <Link href={'#'}>
              <Image
                src={FacebookFooterImage}
                width={45}
                height={45}
                alt="facebook-icon"
              />
            </Link>
            <Link href={'#'}>
              <Image
                src={InstagramFooterImage}
                width={45}
                height={45}
                alt="instagram-icon"
              />
            </Link>
            <Link href={'#'}>
              <Image
                src={TwitterFooterImage}
                width={45}
                height={45}
                alt="twitter-icon"
              />
            </Link>
            <Link href={'#'}>
              <Image
                src={LinkedinFooterImage}
                width={45}
                height={45}
                alt="linkedin-icon"
              />
            </Link>
          </div>
        </div>
      </div>
      <hr className="absolute inset-x-0 bg-[#D2D2D2] w-full mb-[85px] bottom-0" />
      <p className="absolute inset-x-0 w-full text-center bottom-0 py-8">
        Copyright&copy; {new Date().getFullYear()} Stakeverses
      </p>
    </div>
  );
}

export default Footer;
