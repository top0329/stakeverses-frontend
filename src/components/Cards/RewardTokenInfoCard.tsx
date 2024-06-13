import React from 'react';
import Image from 'next/image';

import Button from '@/components/Buttons';
import PickAxeImage from '@/assets/images/pickaxe.svg';
import { IRewardTokenInfo } from '@/types';

function RewardTokenInfoCard({
  tokenAddress,
  tokenId,
  ratio,
  isERC1155,
}: IRewardTokenInfo) {
  return (
    <div className="col-span-12 flex items-center bg-[#053F40] rounded-[20px] px-4 py-8 text-xl md:px-8 xs:col-span-6">
      <div className="flex flex-col justify-between items-center w-full h-full gap-4 2xl:gap-10 xl:flex-row">
        <div className="flex flex-col items-center gap-1">
          <Image
            className="min-w-[205px] aspect-square border border-[#040E20] rounded-full"
            src={PickAxeImage}
            alt="pickaxe"
          />
          {isERC1155 ? <p>ERC1155</p> : <p>ERC20</p>}
        </div>
        <div
          className={`flex flex-col justify-between text-base w-full ${
            isERC1155 ? 'gap-4 xl:gap-6' : 'gap-6 xl:gap-8'
          } md:text-lg`}
        >
          <div className="flex flex-col gap-1">
            <div className="flex flex-row justify-center min-w-[120px] tracking-[-1px]">
              Token Address
            </div>
            <div className="flex justify-center items-center text-center text-sm w-full break-all px-4">
              {tokenAddress}
            </div>
          </div>
          <div className="flex flex-row gap-1">
            <div className="flex flex-row justify-between min-w-[120px]">
              <div className="tracking-[-1px]">Token Name</div>
              <div>:</div>
            </div>
            <div className="flex justify-center items-center text-center w-full truncate font-semibold">
              Pickaxe
            </div>
          </div>
          {isERC1155 && (
            <div className="flex flex-row gap-1">
              <div className="flex flex-row justify-between min-w-[120px]">
                <div className="tracking-[-1px]">Token Id</div>
                <div>:</div>
              </div>
              <div className="flex justify-center items-center text-center w-full font-semibold">
                {tokenId}
              </div>
            </div>
          )}
          <div className="flex flex-row gap-1">
            <div className="flex flex-row justify-between min-w-[120px]">
              <div className="tracking-[-1px]">Ratio</div>
              <div>:</div>
            </div>
            <div className="flex justify-center items-center text-center w-full font-semibold">
              {ratio}
            </div>
          </div>
          <div className="flex flex-row justify-center gap-4 sm:justify-end">
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
