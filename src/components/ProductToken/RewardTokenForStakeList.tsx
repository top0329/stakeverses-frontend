import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Address } from 'viem';

import getERC1155Data from '@/lib/getERC1155Data';
import IronImage from '@/assets/images/iron.svg';
import getTokenData from '@/lib/getTokenData';
import { IRewardTokenInfoForStakeListProps } from '@/types';

function RewardTokenForStakeList({
  tokenId,
  tokenAddress,
  ratio,
  isERC1155,
}: IRewardTokenInfoForStakeListProps) {
  const [imageUri, setImageUri] = useState<string>(IronImage);
  const [name, setName] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      try {
        if (isERC1155) {
          const erc1155Data = await getERC1155Data(
            tokenAddress as Address,
            Number(tokenId)
          );
          if (erc1155Data) {
            const { name, uri } = erc1155Data;
            setImageUri(uri);
            setName(name);
          }
        } else {
          console.log('erc20');
          const erc20Data = await getTokenData(tokenAddress as Address);
          console.log(erc20Data);
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
    if (tokenAddress) {
      fetchData();
    }
  }, [isERC1155, tokenAddress, tokenId]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center h-16 gap-1">
        <div className="text-[22px] rounded-full border border-white aspect-square min-w-[28px] text-center leading-6">
          {Number(ratio)}
        </div>
        <Image
          className="aspect-square w-16 rounded-full"
          width={64}
          height={64}
          src={imageUri}
          alt="product"
          unoptimized
          onError={() => {
            setImageUri(IronImage);
          }}
        />
      </div>
      <div className="relative flex flex-col items-center text-center pb-6">
        <div className="text-2xl text-right">{name}</div>
      </div>
    </div>
  );
}

export default RewardTokenForStakeList;
