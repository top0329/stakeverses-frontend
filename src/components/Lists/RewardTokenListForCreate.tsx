import React from 'react';
import Image from 'next/image';

import IronImage from '@/assets/images/iron.svg';
import { IRewardTokenListForCreate } from '@/types';
import { truncateAddress } from '@/lib/utils';

function RewardTokenListForCreate({
  tokenAddress,
  tokenId,
  amount,
  isERC1155,
}: IRewardTokenListForCreate) {
  return (
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
          <p className="text-[22px] truncate">Token Address</p>
          <p className="text-[24px] font-semibold">
            {tokenAddress ? truncateAddress(tokenAddress) : ''}
          </p>
        </div>
        {isERC1155 && (
          <div className="flex flex-col gap-3">
            <p className="text-[22px] truncate">Token Id</p>
            <p className="text-[24px] font-semibold">{tokenId}</p>
          </div>
        )}
        <div className="flex flex-col gap-2">
          <p className="text-[22px]">Amount</p>
          <p className="text-[28px] font-semibold">{amount}</p>
        </div>
      </div>
    </div>
  );
}

export default RewardTokenListForCreate;
