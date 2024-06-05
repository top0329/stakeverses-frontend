import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Address } from 'viem';

import getERC1155Data from '@/lib/getERC1155Data';
import BreadImage from '@/assets/images/bread.svg';

function ProductTokenStakeList({
  productId,
  amount,
}: {
  productId: number;
  amount: number;
}) {
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
    <div className="flex flex-row justify-between pb-[18px] px-[32px] py-[18px] bg-[#141D2D]/70 rounded-[20px]">
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
      <div className="flex flex-col">
        <p className="text-[22px]">Token Name</p>
        <p className="text-[28px] text-center font-semibold">{name}</p>
      </div>
      <div className="flex flex-col">
        <p className="text-[22px]">Token Id</p>
        <p className="text-[28px] text-center font-semibold">{productId}</p>
      </div>
      <div className="flex flex-col">
        <p className="text-[22px]">Amount</p>
        <p className="text-[28px] text-center font-semibold">{amount}</p>
      </div>
    </div>
  );
}

export default ProductTokenStakeList;
