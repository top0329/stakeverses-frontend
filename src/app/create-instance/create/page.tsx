'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Button from '@/components/Buttons';
import BreadImage from '@/assets/images/bread.svg';
import FarmerImage from '@/assets/images/farmer.svg';
import PickAxeImage from '@/assets/images/pickaxe.svg';
import WaterImage from '@/assets/images/water.svg';
import IronImage from '@/assets/images/iron.svg';

function CreateInstanceCreatePage() {
  const router = useRouter();

  return (
    <React.Fragment>
      <h1 className="mt-[203px] text-[62px] text-center font-semibold">
        Create Instance
      </h1>
      <div className="relative my-24 rounded-[20px] bg-[#030C1B] pt-[103px]">
        <div className="flex flex-row justify-between gap-7 mt-5 mx-8 h-full">
          <div className="w-full text-[38px] text-center h-full">
            <h2 className="text-[38px] font-semibold mb-6">Staking Tokens</h2>
            <div className="flex flex-col gap-[22px] bg-gradient-to-r from-[#0f3a38] to-[#0f484a] py-5 px-9 rounded-[20px] mb-10 h-[500px] overflow-y-auto custom-scrollbar">
              <div className="relative flex flex-row py-6 px-8 bg-[#141D2D]/70 rounded-[20px] gap-7">
                <Image
                  className="min-w-[90px] aspect-square rounded-full"
                  src={BreadImage}
                  alt="bread"
                />
                <div className="flex flex-row justify-between items-center w-full">
                  <div className="flex flex-col">
                    <p className="text-[22px]">Token Name</p>
                    <p className="text-[28px] font-semibold">Bread</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[22px]">Token Id</p>
                    <p className="text-[28px] font-semibold">11564</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[22px]">Ratio</p>
                    <p className="text-[28px] font-semibold">1</p>
                  </div>
                </div>
                <div className="absolute bottom-1.5 right-3 bg-[#141D2D] border border-[#2F3A42] rounded-full text-[#00B6E4] text-sm font-medium px-2 py-0.5">
                  Consumable
                </div>
              </div>
              <div className="flex flex-row py-6 px-8 bg-[#141D2D]/70 rounded-[20px] gap-7">
                <Image
                  className="min-w-[90px] aspect-square rounded-full"
                  src={FarmerImage}
                  alt="farmer"
                />
                <div className="flex flex-row justify-between items-center w-full">
                  <div className="flex flex-col">
                    <p className="text-[22px]">Token Name</p>
                    <p className="text-[28px] font-semibold">Farmer</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[22px]">Token Id</p>
                    <p className="text-[28px] font-semibold">11563</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[22px]">Ratio</p>
                    <p className="text-[28px] font-semibold">1</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-row py-6 px-8 bg-[#141D2D]/70 rounded-[20px] gap-7">
                <Image
                  className="min-w-[90px] aspect-square rounded-full"
                  src={PickAxeImage}
                  alt="pickaxe"
                />
                <div className="flex flex-row justify-between items-center w-full">
                  <div className="flex flex-col">
                    <p className="text-[22px]">Token Name</p>
                    <p className="text-[28px] font-semibold">PickAxe</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[22px]">Token Id</p>
                    <p className="text-[28px] font-semibold">11560</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[22px]">Ratio</p>
                    <p className="text-[28px] font-semibold">1</p>
                  </div>
                </div>
              </div>
              <div className="relative flex flex-row py-6 px-8 bg-[#141D2D]/70 rounded-[20px] gap-7">
                <Image
                  className="min-w-[90px] aspect-square rounded-full"
                  src={WaterImage}
                  alt="water"
                />
                <div className="flex flex-row justify-between items-center w-full">
                  <div className="flex flex-col">
                    <p className="text-[22px]">Token Name</p>
                    <p className="text-[28px] font-semibold">Water</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[22px]">Token Id</p>
                    <p className="text-[28px] font-semibold">11539</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[22px]">Ratio</p>
                    <p className="text-[28px] font-semibold">1</p>
                  </div>
                </div>
                <div className="absolute bottom-1.5 right-3 bg-[#141D2D] border border-[#2F3A42] rounded-full text-[#00B6E4] text-sm font-medium px-2 py-0.5">
                  Consumable
                </div>
              </div>
            </div>
          </div>
          <div className="w-full text-[38px] text-center h-full">
            <h2 className="text-[38px] font-semibold mb-6">Reward Tokens</h2>
            <div className="flex flex-col gap-[22px] bg-gradient-to-r from-[#0f494c] to-[#10585e] py-5 px-9 rounded-[20px] mb-10 h-[500px] overflow-y-auto custom-scrollbar">
              <div className="flex flex-row py-2 px-8 bg-[#141D2D]/70 rounded-[20px] gap-7">
                <div className="flex flex-col">
                  <Image
                    className="min-w-[90px] aspect-square rounded-full"
                    src={IronImage}
                    alt="bread"
                  />
                  <p className="text-[22px]">ERC20</p>
                </div>
                <div className="flex flex-row justify-between items-center w-full">
                  <div className="flex flex-col gap-2">
                    <p className="text-[22px] truncate">Token Name</p>
                    <p className="text-[28px] font-semibold">Iron</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="text-[22px]">Token Address</p>
                    <p className="text-[24px] font-semibold">0xb317...6e5f</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-[22px]">Amount</p>
                    <p className="text-[28px] font-semibold">10</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center gap-10 mt-[50px] pb-[38px]">
          <Button
            className="!bg-[#192F3A]"
            text="Back"
            variant="outline"
            onClick={() => router.push('/create-instance/reward')}
          />
          <Button
            text="Create Instance"
            // onClick={() => setIsAddRewardTokenModalOpen(true)}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default CreateInstanceCreatePage;
