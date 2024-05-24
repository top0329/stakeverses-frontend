import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import StakeversesLogo from '@/assets/images/Stakeverses-logo.png';
import { ConnectWallet } from '../Buttons/connectButton';

function Header() {
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
        <Link className="text-2xl font-medium truncate" href="/stakes">
          Stakes
        </Link>
        {/* <Link className="text-2xl font-medium truncate" href="/my-portfolio">My Portfolio</Link> */}
        <Link className="text-2xl font-medium truncate" href="/create-instance">
          Create Instance
        </Link>
        <Link className="text-2xl font-medium truncate" href="/faq">
          FAQ
        </Link>
        <ConnectWallet />
      </div>
    </div>
  );
}

export default Header;
