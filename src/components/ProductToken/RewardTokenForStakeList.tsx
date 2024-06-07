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
    if (tokenAddress) {
      fetchData();
    }
  }, [isERC1155, tokenAddress, tokenId]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-[22px] rounded-full border border-white aspect-square min-w-[28px] text-center leading-6">
        {Number(ratio)}
      </div>
      <Image
        className="aspect-square min-w-16 rounded-full"
        width={64}
        height={64}
        src={imageUri}
        alt="product"
        unoptimized
        onError={() => {
          setImageUri(IronImage);
        }}
      />
      <div className="text-xl text-right">{name}</div>
      <div className="w-[120px] text-sm text-center bg-[#141D2D] rounded-xl px-2 py-1 border border-[#2F3A42] break-all">
        {tokenAddress}
      </div>
    </div>
  );
}

export default RewardTokenForStakeList;
