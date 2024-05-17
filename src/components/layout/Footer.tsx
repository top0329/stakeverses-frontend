import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import StakeversesLogo from '@/assets/images/Stakeverses-logo.png';

function Footer() {
  return (
    <div className="relative h-[477px] px-[136px] bg-gradient-footer">
      <Link className='' href="/">
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
        <p className="mt-10 text-lg">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
        <p className="mt-16 text-lg">@Lorem</p>
      </div>
      <hr className="absolute inset-x-0 bg-[#D2D2D2] w-full mb-[85px] bottom-0" />
      <p className="absolute inset-x-0 w-full text-center bottom-0 py-8">
        Copyright&copy; {new Date().getFullYear()} Stakeverses
      </p>
    </div>
  );
}

export default Footer;
