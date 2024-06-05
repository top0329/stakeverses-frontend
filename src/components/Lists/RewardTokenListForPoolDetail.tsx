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
    <div className="flex flex-row py-2 px-8 bg-[#141D2D]/70 rounded-[20px] gap-7">
      <div className="flex flex-col">
        <Image
          className="min-w-[90px] aspect-square rounded-full"
          src={IronImage}
          alt="bread"
        />
        <p className="text-[22px]">{isERC1155 ? 'ERC1155' : 'ERC20'}</p>
      </div>
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-col gap-2">
          <p className="text-[22px] truncate">Token Name</p>
          <p className="text-[28px] font-semibold">Iron</p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-[22px]">Token Address</p>
          <p className="text-sm w-48 break-all">
            {/* {tokenAddress ? truncateAddress(tokenAddress) : ''} */}
            {tokenAddress}
          </p>
        </div>
        {isERC1155 && (
          <div className="flex flex-col gap-3">
            <p className="text-[22px]">Token Id</p>
            <p className="text-[24px] font-semibold">{tokenId}</p>
          </div>
        )}
        <div className="flex flex-col gap-2">
          <p className="text-[22px]">Ratio</p>
          <p className="text-[28px] font-semibold">{ratio}</p>
        </div>
      </div>
    </div>
  );
}

export default RewardTokenListForPoolDetail;
