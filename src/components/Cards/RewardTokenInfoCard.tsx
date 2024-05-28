import React from 'react';
import Image from 'next/image';

import Button from '@/components/Buttons';
import PickAxeImage from '@/assets/images/pickaxe.svg';
import { IRewardTokenInfo } from '@/types';
import { truncateAddress } from '@/lib/utils';

function RewardTokenInfoCard({
  tokenAddress,
  tokenId,
  ratio,
  isERC1155,
}: IRewardTokenInfo) {
  return (
    <div className="relative col-span-6 bg-[#053F40] rounded-[20px] px-8 pt-12 pb-5 text-[22px]">
      <div className="flex flex-row justify-between gap-10">
        <div className="flex flex-col text-[22px] justify-start items-center font-semibold gap-2.5">
          <Image
            className="min-w-[205px] aspect-square border border-[#040E20] rounded-full"
            src={PickAxeImage}
            alt="pickaxe"
          />
          {isERC1155 ? <p>ERC1155</p> : <p>ERC20</p>}
        </div>
        <div
          className={`flex flex-col justify-center w-full ${
            isERC1155 ? 'gap-[18px]' : 'gap-9'
          }`}
        >
          <div className="flex flex-row">
            <div className="flex flex-row justify-between min-w-[180px]">
              <div className="font-semibold">Token Name</div>
              <div>:</div>
            </div>
            <div className="flex justify-center items-center text-center text-xl font-medium w-full">
              Pickaxe
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-row justify-between min-w-[180px]">
              <div className="font-semibold">Token Address</div>
              <div>:</div>
            </div>
            <div className="flex justify-center items-center text-center text-xl font-medium w-full">
              {tokenAddress ? truncateAddress(tokenAddress) : ''}
            </div>
          </div>
          {isERC1155 && (
            <div className="flex flex-row">
              <div className="flex flex-row justify-between min-w-[180px]">
                <div className="font-semibold">Token Id</div>
                <div>:</div>
              </div>
              <div className="flex justify-center items-center text-center text-xl font-medium w-full">
                {tokenId}
              </div>
            </div>
          )}
          <div className="flex flex-row">
            <div className="flex flex-row justify-between min-w-[180px]">
              <div className="font-semibold">Ratio</div>
              <div>:</div>
            </div>
            <div className="flex justify-center items-center text-center text-xl font-medium w-full">
              {ratio}
            </div>
          </div>
          <div className="flex flex-row justify-end gap-4 pt-2.5">
            <Button className="!w-[88px] !h-[34px] !text-[18px]" text="Edit" />
            <Button
              className="!w-[88px] !h-[34px] !text-[18px] !bg-[#2F3A42]"
              text="Remove"
              variant="outline"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RewardTokenInfoCard;
