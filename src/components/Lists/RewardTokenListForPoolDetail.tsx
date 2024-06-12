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
    <div className="flex flex-col py-2 px-4 bg-[#141D2D]/70 rounded-[20px] text-lg gap-2 2xl:text-xl">
      <div className="flex flex-row gap-4 lg:gap-2 md:gap-10 sm:gap-2">
        <div className="flex flex-col justify-center items-center gap-0">
          <Image
            className="min-w-[90px] aspect-square rounded-full"
            src={IronImage}
            alt="bread"
          />
          <p>{isERC1155 ? 'ERC1155' : 'ERC20'}</p>
        </div>
        <div className="flex flex-row justify-between items-center w-full gap-1">
          <div className="flex flex-col gap-2">
            <p className="truncate tracking-[-1px]">Token Name</p>
            <p className="font-semibold">Iron</p>
          </div>
          <div className="hidden flex-col gap-1 2xl:flex lg:hidden sm:flex">
            <p className="truncate tracking-[-1px]">Token Address</p>
            <p className="text-sm w-48 break-all">{tokenAddress || ''}</p>
          </div>
          {isERC1155 && (
            <div className="hidden flex-col gap-2 2xl:flex lg:hidden sm:flex">
              <p className="truncate tracking-[-1px]">Token Id</p>
              <p className="font-semibold">{tokenId}</p>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <p className="tracking-[-1px]">Ratio</p>
            <p className="font-semibold">{ratio}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between w-full 2xl:hidden lg:flex sm:hidden">
        <div
          className={`flex ${
            isERC1155 ? 'flex-col' : 'flex-row'
          } justify-between items-center gap-2`}
        >
          <p className="truncate min-w-20 tracking-[-1px]">Address: </p>
          {/* <p className="flex flex-col justify-start items-start text-sm w-auto">
            <span>{tokenAddress?.slice(0, 21)}</span>
            <span>{tokenAddress?.slice(21)}</span>
          </p> */}
          <p className="flex flex-col justify-start items-start text-sm break-all w-auto">
            {tokenAddress}
          </p>
        </div>
        {isERC1155 && (
          <div className="flex flex-col gap-3">
            <p className="truncate tracking-[-1px]">Token Id</p>
            <p className="font-semibold">{tokenId}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RewardTokenListForPoolDetail;
