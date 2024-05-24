import { useRouter } from 'next/navigation';

import ProductTokenForStakeList from '@/components/ProductToken/ProductTokenForStakeList';
import Button from '@/components/Buttons';
import { StakingPoolListProps } from '@/types';
import { truncateAddress } from '@/lib/utils';

import BreadImage from '@/assets/images/bread.svg';
import FarmerImage from '@/assets/images/farmer.svg';
import PickAxeImage from '@/assets/images/pickaxe.svg';
import WaterImage from '@/assets/images/water.svg';
import IronImage from '@/assets/images/iron.svg';

function StakingPoolList({
  productTokenList,
  progress,
  instanceId,
  creatorAddress,
  remainingTime,
}: StakingPoolListProps) {
  const router = useRouter();

  return (
    <div className="bg-[#053F40] px-[50px] py-9 rounded-[20px]">
      <div className="flex items-center justify-between">
        <p className="text-[50px] font-medium -mt-16 px-1">&#40;</p>
        <ProductTokenForStakeList
          imageUri={BreadImage}
          text="Bread"
          consumable
        />
        <p className="text-[35px] font-medium -mt-16 px-1">+</p>
        <ProductTokenForStakeList imageUri={FarmerImage} text="Farmer" />
        <p className="text-[35px] font-medium -mt-16 px-1">+</p>
        <ProductTokenForStakeList imageUri={PickAxeImage} text="PickAxe" />
        <p className="text-[35px] font-medium -mt-16 px-1">+</p>
        <ProductTokenForStakeList
          imageUri={WaterImage}
          text="Water"
          consumable
        />
        <p className="text-[50px] font-medium -mt-16 px-1">&#41;</p>
        <p className="text-[22px] -mt-14 px-1 whitespace-nowrap">* 1 min =</p>
        <ProductTokenForStakeList imageUri={IronImage} text="Iron" />
      </div>
      <div className="flex items-center gap-10 pt-8">
        <div className="w-full h-[34px] bg-[#141D2D] rounded-full border border-white">
          <div
            className={`h-[32px] bg-gradient-to-r from-[#192F3A] to-[#06C2C4] rounded-full text-center text-[22px] w-[${progress}%]`}
          >
            {progress}
          </div>
        </div>
        <Button
          className="!h-14"
          text="Stake"
          variant="primary"
          onClick={() => router.push(`/stakes/${instanceId}`)}
        />
      </div>
      <div className="flex flex-row items-center gap-32 pt-8">
        <div className="flex flex-col items-center gap-2.5 w-[194px] text-center">
          <p className="text-[22px]">Instance Id</p>
          <div className="w-full bg-[#141D2D] border border-[#2F3A42] rounded-[15px] px-4 py-3 text-xl font-medium">
            {instanceId}
          </div>
        </div>
        <div className="flex flex-col items-center gap-2.5 w-[194px] text-center">
          <p className="text-[22px]">Creator Address</p>
          <div className="w-full bg-[#141D2D] border border-[#2F3A42] rounded-[15px] px-4 py-3 text-xl font-medium">
            {truncateAddress(creatorAddress)}
          </div>
        </div>
        <div className="flex flex-col items-center gap-2.5 w-[194px] text-center">
          <p className="text-[22px]">Remaining time</p>
          <div className="w-full bg-[#141D2D] border border-[#2F3A42] rounded-[15px] px-4 py-3 text-xl font-medium">
            {remainingTime}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StakingPoolList;
