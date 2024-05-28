'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Subtitle from '@/components/Subtitle';
import ProductTokenForStakeList from '@/components/ProductToken/ProductTokenForStakeList';
import BreadImage from '@/assets/images/bread.svg';
import FarmerImage from '@/assets/images/farmer.svg';
import PickAxeImage from '@/assets/images/pickaxe.svg';
import WaterImage from '@/assets/images/water.svg';
import IronImage from '@/assets/images/iron.svg';
import Button from '@/components/Buttons';

function PoolDetails({ params }: { params: { id: string } }) {
  const router = useRouter();

  return (
    <React.Fragment>
      <h1 className="mt-[203px] text-[62px] text-center font-semibold">
        Stakes
      </h1>
      <div className="relative my-24 rounded-[20px] bg-[#030C1B] px-[34px]">
        <Subtitle text="Pool Detail" />
        <div className="px-[54px] mb-12">
          <div className="flex items-center justify-between">
            <ProductTokenForStakeList imageUri={FarmerImage} text="Farmer" />
            <p className="text-[35px] font-medium -mt-16 px-1">+</p>
            <ProductTokenForStakeList imageUri={PickAxeImage} text="PickAxe" />
            <p className="text-[35px] font-medium -mt-16 px-1">+</p>
            <p className="text-[50px] font-medium -mt-16 px-1">&#40;</p>
            <ProductTokenForStakeList
              imageUri={BreadImage}
              text="Bread"
              consumable
            />
            <p className="text-[35px] font-medium -mt-16 px-1">+</p>
            <ProductTokenForStakeList
              imageUri={WaterImage}
              text="Water"
              consumable
            />
            <p className="text-[50px] font-medium -mt-16 px-1">&#41;</p>
            <p className="text-[22px] -mt-14 px-1 whitespace-nowrap">
              * 1 min =
            </p>
            <ProductTokenForStakeList imageUri={IronImage} text="Iron" />
          </div>
          <div className="flex flex-row justify-between py-9">
            <div className="flex flex-col items-center gap-2.5 w-[194px] text-center">
              <p className="text-[22px]">Instance Id</p>
              <div className="w-full bg-transparent border border-[#2F3A42] rounded-[15px] px-4 py-3 text-xl font-medium">
                01436
              </div>
            </div>
            <div className="flex flex-col items-center gap-2.5 w-[194px] text-center">
              <p className="text-[22px]">Creator Address</p>
              <div className="w-full bg-transparent border border-[#2F3A42] rounded-[15px] px-4 py-3 text-xl font-medium">
                0xb317...6e5f
              </div>
            </div>
            <div className="flex flex-col items-center gap-2.5 w-[194px] text-center">
              <p className="text-[22px]">Staked Amount</p>
              <div className="w-full bg-transparent border border-[#2F3A42] rounded-[15px] px-4 py-3 text-xl font-medium">
                645
              </div>
            </div>
            <div className="flex flex-col items-center gap-2.5 w-[194px] text-center">
              <p className="text-[22px]">Remaining time</p>
              <div className="w-full bg-transparent border border-[#2F3A42] rounded-[15px] px-4 py-3 text-xl font-medium">
                03:28
              </div>
            </div>
          </div>
          <div className="w-full h-[34px] bg-[#141D2D] rounded-full border border-white mt-2">
            <div
              className={`h-[32px] bg-gradient-to-r from-[#192F3A] to-[#06C2C4] rounded-full text-center text-[22px] w-[76%]`}
            >
              76%
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#192F3A] to-[#06C2C4] rounded-2xl p-0.5">
          <div className="bg-gradient-to-r from-[#010c09] to-[#044756] rounded-2xl">
            <div className="flex flex-row justify-between pt-10 px-[156px]">
              <div className="flex flex-col items-center gap-2.5 w-[194px] text-center">
                <p className="text-[22px]">Total Value Staked</p>
                <div className="w-full bg-transparent border rounded-[15px] px-4 py-3 text-xl font-medium">
                  1436
                </div>
              </div>
              <div className="flex flex-col items-center gap-2.5 w-[194px] text-center">
                <p className="text-[22px] truncate">Number of Stakers</p>
                <div className="w-full bg-transparent border rounded-[15px] px-4 py-3 text-xl font-medium">
                  0xb317...6e5f
                </div>
              </div>
              <div className="flex flex-col items-center gap-2.5 w-[194px] text-center">
                <p className="text-[22px]">Age</p>
                <div className="w-full bg-transparent border rounded-[15px] px-4 py-3 text-xl font-medium">
                  35
                </div>
              </div>
              <div className="flex flex-col items-center gap-2.5 w-[194px] text-center">
                <p className="text-[22px]">Pool State</p>
                <div className="w-full bg-transparent border rounded-[15px] px-4 py-3 text-xl font-medium">
                  398
                </div>
              </div>
            </div>
            <div className="text-[22px] px-10 py-5 rounded-[20px] bg-[#141D2D]/70 mx-[125px] mt-9">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don&apos;t look even
              slightly believable.
            </div>
            <div className="flex flex-row justify-between gap-7 mt-5 mx-8 h-full">
              <div className="w-full text-[38px] text-center h-full">
                <h2 className="text-[38px] font-semibold mb-6">
                  Staking Tokens
                </h2>
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
                <h2 className="text-[38px] font-semibold mb-6">
                  Reward Tokens
                </h2>
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
                        <p className="text-[24px] font-semibold">
                          0xb317...6e5f
                        </p>
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
          </div>
        </div>
        <div className="flex justify-center py-10">
          <Button
            className="!w-[200px]"
            text="Stake"
            onClick={() => router.push('/stakes/932/stake')}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default PoolDetails;
