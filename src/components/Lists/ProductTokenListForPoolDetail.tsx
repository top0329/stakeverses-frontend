import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Address } from 'viem';

import BreadImage from '@/assets/images/bread.svg';
import getERC1155Data from '@/lib/getERC1155Data';
import { IProductTokenInfo } from '@/types';

function ProductTokenListForPoolDetail({
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
    <div className="relative flex flex-row py-6 px-8 bg-[#141D2D]/70 rounded-[20px] gap-7">
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
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-col">
          <p className="text-[22px] truncate">Product Name</p>
          <p className="text-[28px] font-semibold">{name}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-[22px] truncate">Product Id</p>
          <p className="text-[28px] font-semibold">{productId}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-[22px]">Amount</p>
          <p className="text-[28px] font-semibold">1000</p>
        </div>
      </div>
      {consumable && (
        <div className="absolute bottom-1.5 right-3 bg-[#141D2D] border border-[#2F3A42] rounded-full text-[#00B6E4] text-sm font-medium px-2 py-0.5">
          Consumable
        </div>
      )}
    </div>
  );
}

export default ProductTokenListForPoolDetail;
