'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { Icon } from '@iconify/react/dist/iconify.js';

import Subtitle from '@/components/Subtitle';
import Button from '@/components/Buttons';
import AddRewardTokenModal from '@/components/Modals/AddRewardTokenModal';
import RewardTokenInfoCard from '@/components/Cards/RewardTokenInfoCard';
import useWeb3 from '@/hooks/useWeb3';
import useToast from '@/hooks/useToast';
import {
  baseAmountAtom,
  isAddRewardTokenModalOpenAtom,
  rewardTokenInfoAtom,
} from '@/jotai/atoms';

function CreateInstanceRewardPage() {
  const { isConnected } = useWeb3();
  const { showToast } = useToast();
  const router = useRouter();

  const [rewardTokenInfo] = useAtom(rewardTokenInfoAtom);
  const [, setIsAddRewardTokenModalOpen] = useAtom(
    isAddRewardTokenModalOpenAtom
  );
  const [baseAmount, setBaseAmount] = useAtom(baseAmountAtom);

  useEffect(() => {
    if (!isConnected) {
      router.push('/stakes');
      showToast('warning', 'Please connect wallet!');
    }
  }, [isConnected, router, showToast]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setBaseAmount(Number(value));
  };

  const handleNext = () => {
    if (rewardTokenInfo.length === 0)
      showToast('fail', 'You need to add at least one Reward!');
    else if (baseAmount === 0 || baseAmount === undefined)
      showToast('fail', 'You need to enter the valid amount!');
    else router.push('/create-instance/create');
  };

  return (
    <React.Fragment>
      <h1 className="mt-16 text-3xl text-center font-semibold lg:mt-24 lg:text-4xl xl:text-5xl 2xl:text-6xl">
        Create Instance
      </h1>
      <div className="relative my-8 rounded-[20px] bg-[#040E20]/75 xl:my-20 lg:my-16 sm:my-12">
        <Subtitle text="Charge Reward Token" />
        <div className="flex flex-row justify-between items-center text-lg px-4 -mt-10 mb-6 lg:text-xl md:px-10">
          <Icon
            className="cursor-pointer w-6 h-6 xs:w-8 xs:h-8 lg:w-10 lg:h-10"
            icon="icon-park-solid:back"
            width="48"
            height="48"
            onClick={() => router.push('/create-instance/product')}
          />
          <div className="flex flex-row justify-center items-center">
            <label className="font-semibold truncate tracking-[-1px] xs:tracking-[0px]">
              Base Amount :
            </label>
            <input
              className="w-20 ml-2 px-2 bg-transparent border-b-2 border-dashed xs:ml-4"
              step={1}
              onChange={handleInputChange}
              value={baseAmount || ''}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 min-h-[300px] gap-x-4 gap-y-4 px-4 2xl:px-20 2xl:gap-x-10 2xl:gap-y-10 lg:px-10 md:gap-x-6 md:gap-y-6">
          {rewardTokenInfo.length === 0 ? (
            <p className="col-span-12 text-2xl text-center font-semibold pt-[120px] px-8 sm:text-3xl lg:text-4xl sm:px-0">
              No Reward token added.
            </p>
          ) : (
            <React.Fragment>
              {rewardTokenInfo.map((rewardTokenInfo, idx) => (
                <RewardTokenInfoCard
                  key={idx}
                  tokenAddress={rewardTokenInfo.tokenAddress}
                  tokenId={rewardTokenInfo.tokenId}
                  ratio={rewardTokenInfo.ratio}
                  isERC1155={rewardTokenInfo.isERC1155}
                />
              ))}
            </React.Fragment>
          )}
        </div>
        <div className="flex flex-row justify-center gap-4 mt-[50px] pb-[38px] xs:gap-10">
          <Button
            text="Add Reward"
            onClick={() => setIsAddRewardTokenModalOpen(true)}
          />
          <Button
            className="!bg-[#192F3A] !w-[140px] xs:!w-[160px] xl:!w-[200px]"
            text="Next"
            variant="outline"
            onClick={handleNext}
          />
        </div>
      </div>
      <AddRewardTokenModal />
    </React.Fragment>
  );
}

export default CreateInstanceRewardPage;
