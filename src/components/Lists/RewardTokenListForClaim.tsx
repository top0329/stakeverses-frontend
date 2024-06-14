import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Address } from 'viem';

import getERC1155Data from '@/lib/getERC1155Data';
import getTokenData from '@/lib/getTokenData';
import DefaultERC20Image from '@/assets/images/erc20.png';
import { IRewardTokenListForCreate } from '@/types';

function RewardTokenListForClaim({
  tokenAddress,
  tokenId,
  amount,
  isERC1155,
}: IRewardTokenListForCreate) {
  const [imageUri, setImageUri] = useState<string>(DefaultERC20Image.src);
  const [name, setName] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      try {
        if (isERC1155) {
          const erc1155Data = await getERC1155Data(
            (tokenAddress || '') as Address,
            Number(tokenId)
          );
          if (erc1155Data) {
            const { name, uri } = erc1155Data;
            setImageUri(uri);
            setName(name);
          }
        } else {
          const erc20Data = await getTokenData(tokenAddress as Address);
          if (erc20Data) {
            const { tokenName } = erc20Data;
            setImageUri(
              `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${tokenAddress}/logo.png`
            );
            setName(tokenName);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [isERC1155, tokenId, tokenAddress]);

  return (
    <div className="flex flex-row justify-start items-center text-lg bg-[#053F40] rounded-[20px] px-4 py-5 gap-4 lg:px-14 md:text-xl sm:justify-between sm:px-8">
      <div className="flex flex-col justify-center items-center gap-1 lg:flex-row lg:gap-4">
        <Image
          className="aspect-square min-w-[90px] rounded-full"
          width={90}
          height={90}
          src={imageUri}
          alt="reward"
          unoptimized
          onError={() => {
            setImageUri(DefaultERC20Image.src);
          }}
        />
        <div className="font-semibold">{isERC1155 ? 'ERC1155' : 'ERC20'}</div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between items-center gap-10 sm:justify-between sm:gap-4 lg:gap-6 2xl:gap-20">
          <div className="flex flex-col text-center">
            <div className="truncate tracking-[-1px]">
              <span className="hidden md:block">Token Name</span>
              <span className="block md:hidden">Name</span>
            </div>
            <div className="font-semibold">{name}</div>
          </div>
          <div className="hidden flex-col text-center gap-2 sm:flex">
            <div className="truncate tracking-[-1px]">
              <span className="hidden md:block">Token Address</span>
              <span className="block md:hidden">Address</span>
            </div>
            <div className="text-sm break-all">{tokenAddress}</div>
          </div>
          {isERC1155 && (
            <div className="flex flex-col text-center gap-2">
              <div className="truncate tracking-[-1px]">
                <span className="hidden md:block">Token Id</span>
                <span className="block md:hidden">Id</span>
              </div>
              <div className="font-semibold">{tokenId}</div>
            </div>
          )}
          <div className="flex flex-col text-center">
            <div className="truncate tracking-[-1px]">
              <span className="hidden md:block">Token Amount</span>
              <span className="block md:hidden">Amount</span>
            </div>
            <div className="font-semibold">{amount}</div>
          </div>
        </div>
        <div className="flex flex-row justify-between sm:hidden">
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
