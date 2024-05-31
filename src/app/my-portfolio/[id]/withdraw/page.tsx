import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Button from '@/components/Buttons';
import IronImage from '@/assets/images/iron.svg';

function WithDrawPage() {
  const router = useRouter();

  return (
    <React.Fragment>
      <h1 className="mt-[203px] text-[62px] text-center font-semibold">
        Withdraw
      </h1>
      <div className="flex flex-col mt-24 py-20 px-24 rounded-b-[20px] rounded-tr-[20px] bg-[#040E20]/75 gap-10 mb-20">
        <div className="flex flex-row justify-between items-center text-[28px] bg-[#053F40] rounded-[20px] px-14 py-5">
          <Image
            className="min-w-[90px] aspect-square rounded-full"
            src={IronImage}
            alt="iron"
          />
          <div className="font-semibold">ERC20</div>
          <div className="flex flex-col text-center">
            <div className="text-[22px]">Token Name</div>
            <div className="font-semibold">Iron</div>
          </div>
          <div className="flex flex-col text-center gap-2">
            <div className="text-[22px]">Token Address</div>
            <div className="text-[24px] font-semibold">0xb317...6e5f</div>
          </div>
          <div className="flex flex-col text-center">
            <div className="text-[22px]">Withdraw Amount</div>
            <div className="font-semibold">10</div>
          </div>
          <Button className="!w-[200px] !h-[56px]" text="Claim" />
        </div>
        <div className="flex flex-row justify-between items-center text-[28px] bg-[#053F40] rounded-[20px] px-14 py-5">
          <Image
            className="min-w-[90px] aspect-square rounded-full"
            src={IronImage}
            alt="iron"
          />
          <div className="font-semibold">ERC20</div>
          <div className="flex flex-col text-center">
            <div className="text-[22px]">Token Name</div>
            <div className="font-semibold">Iron</div>
          </div>
          <div className="flex flex-col text-center gap-2">
            <div className="text-[22px]">Token Address</div>
            <div className="text-[24px] font-semibold">0xb317...6e5f</div>
          </div>
          <div className="flex flex-col text-center">
            <div className="text-[22px]">Withdraw Amount</div>
            <div className="font-semibold">10</div>
          </div>
          <Button className="!w-[200px] !h-[56px]" text="Claim" />
        </div>
        <div className="flex flex-row justify-between items-center text-[28px] bg-[#053F40] rounded-[20px] px-14 py-5">
          <Image
            className="min-w-[90px] aspect-square rounded-full"
            src={IronImage}
            alt="iron"
          />
          <div className="font-semibold">ERC20</div>
          <div className="flex flex-col text-center">
            <div className="text-[22px]">Token Name</div>
            <div className="font-semibold">Iron</div>
          </div>
          <div className="flex flex-col text-center gap-2">
            <div className="text-[22px]">Token Address</div>
            <div className="text-[24px] font-semibold">0xb317...6e5f</div>
          </div>
          <div className="flex flex-col text-center">
            <div className="text-[22px]">Withdraw Amount</div>
            <div className="font-semibold">10</div>
          </div>
          <Button className="!w-[200px] !h-[56px]" text="Withdraw" />
        </div>
        <div className="flex justify-center items-center gap-10">
          <Button text="Claim All" />
          <Button
            className="!bg-[#192F3A]"
            text="Cancel"
            variant="outline"
            onClick={() => router.push('/my-portfolio')}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default WithDrawPage;
