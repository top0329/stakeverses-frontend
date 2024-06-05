import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Address } from 'viem';

import BreadImage from '@/assets/images/bread.svg';
import { IProductTokenInfo } from '@/types';
import getERC1155Data from '@/lib/getERC1155Data';

function ProductTokenListForWithdraw({
  productId,
  consumable,
}: IProductTokenInfo) {
  const [imageUri, setImageUri] = useState<string>(BreadImage);
  const [name, setName] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      try {
        const erc1155Data = await getERC1155Data(
          (process.env.NEXT_PUBLIC_PRODUCTADDRESS || '') as Address,
          Number(productId)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  return (
    <div className="relative flex flex-row justify-between items-center text-[28px] bg-[#053F40] rounded-[20px] px-14 py-5">
      <Image
        className="aspect-square min-w-[90px] rounded-full"
        width={90}
        height={90}
        src={imageUri}
        alt="product"
        unoptimized
        onError={() => {
          setImageUri(BreadImage);
        }}
      />
      <div className="flex flex-col text-center">
        <div className="text-[22px]">Token Name</div>
        <div className="font-semibold">{name}</div>
      </div>
      <div className="flex flex-col text-center">
        <div className="text-[22px]">Token Id</div>
        <div className="font-semibold">{productId}</div>
      </div>
      <div className="flex flex-col text-center">
        <div className="text-[22px]">Withdraw Amount</div>
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
