import React from 'react';
import Image from 'next/image';

import IronImage from '@/assets/images/iron.svg';
import { IRewardTokenInfo } from '@/types';

function RewardTokenListForPoolDetail({
  tokenAddress,
  tokenId,
  ratio,
  isERC1155,
}: IRewardTokenInfo) {
  return (
    <div className="flex flex-row py-2 px-4 bg-[#141D2D]/70 rounded-[20px] gap-2">
      <div className="flex flex-col">
        <Image
          className="min-w-[90px] aspect-square rounded-full"
          src={IronImage}
          alt="bread"
        />
        <p className="text-xl">{isERC1155 ? 'ERC1155' : 'ERC20'}</p>
      </div>
      <div className="flex flex-row justify-between items-center w-full gap-1">
        <div className="flex flex-col gap-2">
          <p className="text-xl truncate">Token Name</p>
          <p className="text-2xl font-semibold">Iron</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xl">Token Address</p>
          <p className="text-sm w-48 break-all">
            {tokenAddress}
          </p>
        </div>
        {isERC1155 && (
          <div className="flex flex-col gap-3">
            <p className="text-xl">Token Id</p>
            <p className="text-2xl font-semibold">{tokenId}</p>
          </div>
        )}
        <div className="flex flex-col gap-2">
          <p className="text-xl">Ratio</p>
          <p className="text-2xl font-semibold">{ratio}</p>
        </div>
      </div>
    </div>
  );
}

export default RewardTokenListForPoolDetail;
