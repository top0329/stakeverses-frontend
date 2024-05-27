'use client';

import React, { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useRouter } from 'next/navigation';

import Subtitle from '@/components/Subtitle';
import Button from '@/components/Buttons';
import ProductTokenForStakeList from '@/components/ProductToken/ProductTokenForStakeList';
import BreadImage from '@/assets/images/bread.svg';
import FarmerImage from '@/assets/images/farmer.svg';
import PickAxeImage from '@/assets/images/pickaxe.svg';
import WaterImage from '@/assets/images/water.svg';
import IronImage from '@/assets/images/iron.svg';

function StakesPage() {
  const router = useRouter();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <React.Fragment>
      <h1 className="mt-[203px] text-[62px] text-center font-semibold">
        Stakes
      </h1>
      <div className="relative my-24 rounded-[20px] bg-[#030C1B]">
        <Subtitle text="Stakes List" />
        <button
          className="absolute top-[50px] right-[96px] flex items-center gap-5 bg-gradient-to-r from-[#192F3A] to-[#06C2C4] text-white text-[22px] font-semibold rounded-[5px] py-2.5 px-[18px]"
          onClick={handleDropdown}
        >
          <span>View</span>
          <Icon icon="ep:arrow-down-bold" />
        </button>
        <div
          id="dropdown"
          className={`absolute top-[110px] right-[96px] z-10  bg-[#00242D] divide-y divide-gray-100 rounded-[5px] shadow w-[140px] h-[108px] ${
            isDropdownOpen ? 'block' : 'hidden'
          }`}
        >
          <ul className="px-2 py-3 text-xl text-center">
            <li className="bg-gradient-to-br from-[#00B8E2] to-[#00E2B2] py-1.5 px-[15px] rounded-[5px] mb-2">
              <button>List View</button>
            </li>
            <li className="py-1.5 px-[15px] rounded-[5px]">
              <button>Grid View</button>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-10 mx-[90px] pb-10">
          <div className="bg-[#053F40] px-[50px] py-9 rounded-[20px]">
            <div className="flex items-center justify-between">
              <ProductTokenForStakeList imageUri={FarmerImage} text="Farmer" />
              <p className="text-[35px] font-medium -mt-16 px-1">+</p>
              <ProductTokenForStakeList
                imageUri={PickAxeImage}
                text="PickAxe"
              />
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
            <div className="flex items-center gap-10 pt-8">
              <div className="w-full h-[34px] bg-[#141D2D] rounded-full border border-white">
                <div
                  className={`h-[32px] bg-gradient-to-r from-[#192F3A] to-[#06C2C4] rounded-full text-center text-[22px] w-[76%]`}
                >
                  76%
                </div>
              </div>
              <Button
                className="!h-14"
                text="Stake"
                variant="primary"
                onClick={() => router.push('/stakes/932')}
              />
            </div>
            <div className="flex flex-row items-center gap-32 pt-8">
              <div className="flex flex-col items-center gap-2.5 w-[194px] text-center">
                <p className="text-[22px]">Instance Id</p>
                <div className="w-full bg-[#141D2D] border border-[#2F3A42] rounded-[15px] px-4 py-3 text-xl font-medium">
                  01436
                </div>
              </div>
              <div className="flex flex-col items-center gap-2.5 w-[194px] text-center">
                <p className="text-[22px]">Creator Address</p>
                <div className="w-full bg-[#141D2D] border border-[#2F3A42] rounded-[15px] px-4 py-3 text-xl font-medium">
                  0xb317...6e5f
                </div>
              </div>
              <div className="flex flex-col items-center gap-2.5 w-[194px] text-center">
                <p className="text-[22px]">Remaining time</p>
                <div className="w-full bg-[#141D2D] border border-[#2F3A42] rounded-[15px] px-4 py-3 text-xl font-medium">
                  03:28
                </div>
              </div>
            </div>
          </div>
          <div className="text-[38px] text-center font-semibold underline">
            See More
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default StakesPage;
