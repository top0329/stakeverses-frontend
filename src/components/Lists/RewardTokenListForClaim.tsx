import React from 'react';
import Image from 'next/image';

import IronImage from '@/assets/images/iron.svg';
import { truncateAddress } from '@/lib/utils';
import { IRewardTokenListForCreate } from '@/types';

function RewardTokenListForClaim({
  tokenAddress,
  tokenId,
  amount,
  isERC1155,
}: IRewardTokenListForCreate) {
  return (
    <div className="flex flex-row justify-between items-center text-[28px] bg-[#053F40] rounded-[20px] px-14 py-5">
      <Image
        className="min-w-[90px] aspect-square rounded-full"
        src={IronImage}
        alt="iron"
      />
      <div className="font-semibold">{isERC1155 ? 'ERC1155' : 'ERC20'}</div>
      <div className="flex flex-col text-center">
        <div className="text-[22px]">Token Name</div>
        <div className="font-semibold">Iron</div>
      </div>
      <div className="flex flex-col text-center gap-2">
        <div className="text-[22px]">Token Address</div>
        <div className="text-[24px] font-semibold">
          {tokenAddress ? truncateAddress(tokenAddress) : ''}
        </div>
      </div>
      {isERC1155 && (
        <div className="flex flex-col text-center gap-2">
          <div className="text-[22px]">Token Id</div>
          <div className="text-[24px] font-semibold">{tokenId}</div>
        </div>
      )}
      <div className="flex flex-col text-center">
        <div className="text-[22px]">Claim Amount</div>
        <div className="font-semibold">10</div>
      </div>
    </div>
  );
}

export default RewardTokenListForClaim;
