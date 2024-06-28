import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Address } from 'viem';

import getERC1155Data from '@/lib/getERC1155Data';
import DefaultERC20Image from '@/assets/images/erc20.png';
import getTokenData from '@/lib/getTokenData';
import { IRewardTokenInfoForStakeListProps } from '@/types';

function RewardTokenForStakeList({
  tokenId,
  tokenAddress,
  ratio,
  isERC1155,
  claimableReward,
}: IRewardTokenInfoForStakeListProps) {
  const [imageUri, setImageUri] = useState<string>(DefaultERC20Image.src);
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
  }, [isERC1155, tokenAddress, tokenId, claimableReward]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-[22px] rounded-full border border-black aspect-square min-w-[28px] text-center leading-6 mb-1 dark:border-white">
        {Number(ratio)}
      </div>
      <Image
        className="aspect-square min-w-16 rounded-full"
        width={64}
        height={64}
        src={imageUri || DefaultERC20Image.src}
        alt="product"
        unoptimized
        onError={() => {
          setImageUri(DefaultERC20Image.src);
        }}
      />
      <div className="text-sm text-right lg:text-xl sm:text-lg xs:text-base">
        {name}
      </div>
      <div className="flex flex-col text-[10px] text-center tracking-[-1px] bg-[#c8dcff] rounded-xl px-1.5 py-1 border border-[#2F3A42] break-words sm:text-xs lg:text-sm xs:px-2 dark:bg-[#141D2D]">
        <span>{tokenAddress.slice(0, 11)}</span>
        <span>{tokenAddress.slice(11, 22)}</span>
        <span>{tokenAddress.slice(22, 33)}</span>
        <span>{tokenAddress.slice(33)}</span>
      </div>
      {claimableReward !== undefined && (
        <div className="text-[22px] text-center leading-6">
          {Number(claimableReward)}
        </div>
      )}
    </div>
  );
}

export default RewardTokenForStakeList;
