import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Address } from 'viem';

import useWeb3 from '@/hooks/useWeb3';
import DefaultERC1155Image from '@/assets/images/erc1155.png';
import getERC1155Data from '@/lib/getERC1155Data';
import { IProductTokenInfo } from '@/types';

function ProductTokenListForWithdraw({
  productId,
  consumable,
}: IProductTokenInfo) {
  const { library, currentProductAddress } = useWeb3();

  const [imageUri, setImageUri] = useState<string>(DefaultERC1155Image.src);
  const [name, setName] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      try {
        const erc1155Data = await getERC1155Data(
          currentProductAddress as Address,
          Number(productId),
          library
        );
        if (erc1155Data) {
          const { name, uri } = erc1155Data;
          setImageUri(uri);
          setName(name);
        }
      } catch (err) {
        console.log(err);
      }
    }
    if (productId) {
      fetchData();
    }
  }, [currentProductAddress, library, productId]);

  return (
    <div className="relative flex flex-row justify-between items-center text-xl bg-[#47556e] rounded-[20px] px-4 py-5 md:px-14 sm:px-8 dark:bg-[#053F40]">
      <Image
        className="aspect-square min-w-[90px] rounded-full"
        width={90}
        height={90}
        src={imageUri}
        alt="product"
        unoptimized
        onError={() => {
          setImageUri(DefaultERC1155Image.src);
        }}
      />
      <div className="flex flex-col text-center">
        <div className="truncate">
          <span className="hidden md:block">Token Name</span>
          <span className="block md:hidden">Name</span>
        </div>
        <div className="font-semibold">{name}</div>
      </div>
      <div className="flex flex-col text-center">
        <div className="truncate">
          <span className="hidden md:block">Token Id</span>
          <span className="block md:hidden">Id</span>
        </div>
        <div className="font-semibold">{productId}</div>
      </div>
      <div className="flex flex-col text-center">
        <div className="truncate">
          <span className="hidden md:block">Token Amount</span>
          <span className="block md:hidden">Amount</span>
        </div>
        <div className="font-semibold">10</div>
      </div>
      {consumable && (
        <div className="absolute bottom-1.5 right-3 bg-[#141D2D] border border-[#2F3A42] rounded-full text-[#00B6E4] text-sm font-medium px-2 py-0.5">
          Consumable
        </div>
      )}
    </div>
  );
}

export default ProductTokenListForWithdraw;
