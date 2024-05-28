'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';

import Subtitle from '@/components/Subtitle';
import Button from '@/components/Buttons';
import AddRewardTokenModal from '@/components/Modals/AddRewardTokenModal';
import RewardTokenInfoCard from '@/components/Cards/RewardTokenInfoCard';
import {
  isAddRewardTokenModalOpenAtom,
  rewardTokenInfoAtom,
} from '@/jotai/atoms';

function CreateInstanceRewardPage() {
  const router = useRouter();

  const [rewardTokenInfo] = useAtom(rewardTokenInfoAtom);
  const [, setIsAddRewardTokenModalOpen] = useAtom(
    isAddRewardTokenModalOpenAtom
  );

  return (
    <React.Fragment>
      <h1 className="mt-[203px] text-[62px] text-center font-semibold">
        Create Instance
      </h1>
      <div className="relative my-24 rounded-[20px] bg-[#030C1B] min-h-[644px]">
        <Subtitle text="Charge Reward Token" />
        <div className="flex flex-row justify-end items-center text-[22px] px-10 -mt-10 mb-6">
          <label className="font-semibold">Enter Base Amount :</label>
          <input className="w-20 ml-4 px-2 bg-transparent border-b-2 border-dashed" />
        </div>
        <div className="grid grid-cols-12 min-h-[315px] gap-x-20 gap-y-10 px-10">
          {rewardTokenInfo.length === 0 ? (
            <p className="col-span-12 text-[42px] text-center font-semibold pt-[120px]">
              No Reward token added.
            </p>
          ) : (
            <React.Fragment>
              {rewardTokenInfo.map((rewardTokenInfo) => (
                <RewardTokenInfoCard
                  key={rewardTokenInfo.tokenId}
                  tokenAddress={rewardTokenInfo.tokenAddress}
                  tokenId={rewardTokenInfo.tokenId}
                  ratio={rewardTokenInfo.ratio}
                  isERC1155={rewardTokenInfo.isERC1155}
                />
              ))}
            </React.Fragment>
          )}
        </div>
        <div className="flex flex-row justify-center gap-10 mt-[50px] pb-[38px]">
          <Button
            text="Add Reward"
            onClick={() => setIsAddRewardTokenModalOpen(true)}
          />
          <Button
            className="!bg-[#192F3A]"
            text="Next"
            variant="outline"
            onClick={() => router.push('/create-instance/create')}
          />
        </div>
      </div>
      <AddRewardTokenModal />
    </React.Fragment>
  );
}

export default CreateInstanceRewardPage;
