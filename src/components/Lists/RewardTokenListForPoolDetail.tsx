import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { Address } from 'viem';

import useWeb3 from '@/hooks/useWeb3';
import DefaultERC20Image from '@/assets/images/erc20.png';
import getERC1155Data from '@/lib/getERC1155Data';
import getTokenData from '@/lib/getTokenData';
import { IRewardTokenInfo } from '@/types';

function RewardTokenListForPoolDetail({
  tokenAddress,
  tokenId,
  ratio,
  isERC1155,
}: IRewardTokenInfo) {
  const { library, currentTokenDataUrl } = useWeb3();

  const [imageUri, setImageUri] = useState<string>(DefaultERC20Image.src);
  const [name, setName] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      try {
        if (isERC1155) {
          const erc1155Data = await getERC1155Data(
            (tokenAddress || '') as Address,
            Number(tokenId),
            library
          );
          if (erc1155Data) {
            const { name, uri } = erc1155Data;
            setImageUri(uri);
            setName(name);
          }
        } else {
          const erc20Data = await getTokenData(
            tokenAddress as Address,
            library
          );
          if (erc20Data) {
            const { tokenName } = erc20Data;
            if (!currentTokenDataUrl) {
              setImageUri(DefaultERC20Image.src);
              setName(tokenName);
              return;
            }
            const response = await axios.get(
              `${currentTokenDataUrl}/${tokenAddress}`
            );
            let logo: string;
            if (response.data.image.large) {
              logo = response.data.image.large;
            } else {
              logo = DefaultERC20Image.src;
            }
            setImageUri(logo);
            setName(tokenName);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [isERC1155, tokenId, tokenAddress, library, currentTokenDataUrl]);

  return (
    <div className="flex flex-col py-2 px-4 text-white bg-[#47556e] rounded-[20px] text-lg gap-2 2xl:text-xl dark:bg-[#141D2D]/70">
      <div className="flex flex-row justify-between w-full gap-4 lg:gap-2 md:gap-6 sm:gap-2 xs:gap-10">
        <div className="flex flex-col justify-center items-center gap-0">
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
          <p>{isERC1155 ? 'ERC1155' : 'ERC20'}</p>
        </div>
        <div className="flex flex-row justify-between items-center w-full gap-1">
          <div className="flex flex-col gap-2">
            <p className="truncate tracking-[-1px]">Token Name</p>
            <p className="font-semibold">{name}</p>
          </div>
          <div className="hidden flex-col sm:flex">
            <p className="truncate tracking-[-1px]">Token Address</p>
            <p className="text-sm w-48 break-all">{tokenAddress || ''}</p>
          </div>
          {isERC1155 && (
            <div className="hidden flex-col gap-2 sm:flex">
              <p className="truncate tracking-[-1px]">Token Id</p>
              <p className="font-semibold">{tokenId}</p>
            </div>
          )}
          <div className="hidden flex-col gap-2 sm:flex">
            <p className="tracking-[-1px]">Ratio</p>
            <p className="font-semibold">{ratio}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-semibold text-sm break-all block sm:hidden">
          <span className="text-lg font-normal truncate min-w-20 tracking-[-1px]">
            Address:{' '}
          </span>
          {tokenAddress}
        </p>
        <div
          className={`flex flex-row ${
            isERC1155 ? 'justify-between' : 'justify-end'
          } w-full gap-2 sm:hidden`}
        >
          {isERC1155 && (
            <div className="flex flex-row gap-2">
              <p className="truncate">Id: </p>
              <p className="font-semibold">{tokenId}</p>
            </div>
          )}
          <div className="flex flex-row gap-2">
            <p>Ratio: </p>
            <p className="font-semibold">{ratio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RewardTokenListForPoolDetail;
