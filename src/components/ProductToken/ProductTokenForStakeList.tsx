import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { Address } from 'viem';

import useWeb3 from '@/hooks/useWeb3';
import DefaultERC1155Image from '@/assets/images/erc1155.png';
import DefaultERC20Image from '@/assets/images/erc20.png';
import getTokenData from '@/lib/getTokenData';
import getERC1155Data from '@/lib/getERC1155Data';
import { IProductTokenForStakeListProps } from '@/types';

function ProductTokenForStakeList({
  tokenId,
  tokenAddress,
  ratio,
  isERC1155,
  consumable,
}: IProductTokenForStakeListProps) {
  const { library, currentTokenDataUrl } = useWeb3();

  const [imageUri, setImageUri] = useState<string>(DefaultERC1155Image.src);
  const [name, setName] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      try {
        if (isERC1155) {
          const erc1155Data = await getERC1155Data(
            tokenAddress as Address,
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
    if (tokenAddress) {
      fetchData();
    }
  }, [currentTokenDataUrl, isERC1155, library, tokenAddress, tokenId]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center items-center h-full gap-1">
        <div className="text-[22px] rounded-full border border-black aspect-square min-w-[28px] text-center leading-6 dark:border-white">
          {Number(ratio)}
        </div>
        <Image
          className="aspect-square min-w-12 max-w-12 rounded-full sm:min-w-16 sm:max-w-16"
          width={64}
          height={64}
          src={imageUri}
          alt="product"
          unoptimized
          onError={() => {
            setImageUri(DefaultERC1155Image.src);
            setName('product');
          }}
        />
      </div>
      <div className="relative flex flex-col items-center text-center pb-6">
        <div className="text-sm text-right lg:text-xl sm:text-lg xs:text-base">
          {isERC1155 && `Id: ${tokenId}`}
        </div>
        <div className="text-sm text-right lg:text-xl sm:text-lg xs:text-base">
          {name}
        </div>
        <div className="flex flex-col text-[10px] text-center tracking-[-1px] bg-[#c8dcff] rounded-xl px-1 py-1 border border-[#2F3A42] break-words sm:text-xs lg:text-sm xs:px-1.5 dark:bg-[#141D2D]">
          <span>{tokenAddress.slice(0, 11)}</span>
          <span>{tokenAddress.slice(11, 22)}</span>
          <span>{tokenAddress.slice(22, 33)}</span>
          <span>{tokenAddress.slice(33)}</span>
        </div>
        <div
          className={`absolute -bottom-0.5 text-[10px] text-white rounded-full bg-[#2F3A42] px-1 py-1 w-auto sm:px-1.5 ${
            consumable ? 'block' : 'hidden'
          }`}
        >
          Consumable
        </div>
      </div>
    </div>
  );
}

export default ProductTokenForStakeList;
