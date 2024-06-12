import React from 'react';
import Image from 'next/image';

import IronImage from '@/assets/images/iron.svg';
import { IRewardTokenListForCreate } from '@/types';

function RewardTokenListForClaim({
  tokenAddress,
  tokenId,
  amount,
  isERC1155,
}: IRewardTokenListForCreate) {
  return (
    <div className="flex flex-row justify-start items-center text-lg bg-[#053F40] rounded-[20px] px-4 py-5 gap-4 lg:px-14 md:text-xl sm:justify-between sm:px-8">
      <div className="flex flex-col justify-center items-center gap-1 lg:flex-row lg:gap-4">
        <Image
          className="min-w-[90px] aspect-square rounded-full"
          width={90}
          height={90}
          src={IronImage}
          alt="iron"
        />
        <div className="font-semibold">{isERC1155 ? 'ERC1155' : 'ERC20'}</div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between items-center gap-10 sm:justify-between sm:gap-4">
          <div className="flex flex-col text-center">
            <div className="truncate tracking-[-1px]">Name</div>
            <div className="font-semibold">Iron</div>
          </div>
          <div className="hidden flex-col text-center gap-2 sm:flex">
            <div className="truncate tracking-[-1px]">Address</div>
            <div className="text-sm break-all">{tokenAddress}</div>
          </div>
          {isERC1155 && (
            <div className="flex flex-col text-center gap-2">
              <div className="truncate tracking-[-1px]">Id</div>
              <div className="font-semibold">{tokenId}</div>
            </div>
          )}
          <div className="flex flex-col text-center">
            <div className="truncate tracking-[-1px]">Amount</div>
            <div className="font-semibold">10</div>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col text-center gap-2">
            <div className="truncate tracking-[-1px]">Address</div>
            <div className="text-sm break-all">{tokenAddress}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RewardTokenListForClaim;
