import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Address } from 'viem';

import useWeb3 from '@/hooks/useWeb3';
import DefaultERC1155Image from '@/assets/images/erc1155.png';
import getERC1155Data from '@/lib/getERC1155Data';
import { IProductTokenInfo } from '@/types';

function ProductTokenListForCreate({
  productId,
  ratio,
  consumable,
}: IProductTokenInfo) {
  const { library } = useWeb3();

  const [imageUri, setImageUri] = useState<string>(DefaultERC1155Image.src);
  const [name, setName] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      try {
        const erc1155Data = await getERC1155Data(
          (process.env.NEXT_PUBLIC_PRODUCTADDRESS || '') as Address,
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
  }, [library, productId]);

  return (
    <div className="relative flex flex-col text-lg px-4 py-6 bg-[#4e5a6e] rounded-[20px] gap-2 2xl:text-xl lg:gap-2 md:gap-10 sm:flex-row dark:bg-[#141D2D]/70">
      <div className="flex flex-row justify-between w-full gap-4 lg:gap-2 md:gap-10 sm:gap-2 xs:gap-10">
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
        <div className="flex flex-row justify-between items-center w-full gap-1">
          <div className="flex flex-col">
            <p className="truncate tracking-[-1px]">Product Name</p>
            <p className="font-semibold">{name}</p>
          </div>
          <div className="flex-col hidden sm:flex">
            <p className="truncate tracking-[-1px]">Product Id</p>
            <p className="font-semibold">{productId}</p>
          </div>
          <div className="flex-col hidden sm:flex">
            <p className="tracking-[-1px]">Ratio</p>
            <p className="font-semibold">{ratio}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between gap-2">
        <div className="flex flex-row gap-2 sm:hidden">
          <p className="truncate">Product Id: </p>
          <p className="font-semibold">{productId}</p>
        </div>
        <div className="flex flex-row gap-2 sm:hidden">
          <p>Ratio: </p>
          <p className="font-semibold">{ratio}</p>
        </div>
      </div>
      {consumable && (
        <div className="absolute bottom-[140px] right-3 bg-[#141D2D] border border-[#2F3A42] rounded-full text-[#00B6E4] text-sm font-medium px-2 py-0.5 sm:bottom-1.5">
          Consumable
        </div>
      )}
    </div>
  );
}

export default ProductTokenListForCreate;
