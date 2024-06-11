import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Address } from 'viem';

import BreadImage from '@/assets/images/bread.svg';
import getERC1155Data from '@/lib/getERC1155Data';
import { IProductTokenInfo } from '@/types';

function ProductTokenListForPoolDetail({
  productId,
  consumable,
  amount,
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
    <div
      className={`relative flex flex-row text-lg pt-2 px-4 bg-[#141D2D]/70 rounded-[20px] gap-2 2xl:text-xl lg:gap-2 md:gap-10 ${
        consumable ? 'pb-6' : 'pb-2'
      }`}
    >
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
      <div className="flex flex-row justify-between items-center w-full gap-1">
        <div className="flex flex-col">
          <p className="truncate tracking-[-1px]">Product Name</p>
          <p className="font-semibold">{name}</p>
        </div>
        <div className="flex flex-col">
          <p className="truncate tracking-[-1px]">Product Id</p>
          <p className="font-semibold">{productId}</p>
        </div>
        <div className="flex flex-col">
          <p className="tracking-[-1px]">Amount</p>
          <p className="font-semibold">{amount}</p>
        </div>
      </div>
      {consumable && (
        <div className="absolute bottom-1.5 right-3 bg-[#141D2D] border border-[#2F3A42] rounded-full text-[#00B6E4] text-sm font-medium px-2 py-0.5">
          Consumable
        </div>
      )}
    </div>
    // <div
    //   className={`relative flex flex-col pt-2 px-8 bg-[#141D2D]/70 rounded-[20px] gap-2 2xl:px-4 ${
    //     consumable ? 'pb-6' : 'pb-2'
    //   }`}
    // >
    //   <div className="flex flex-row justify-between w-full gap-4 2xl:gap-2">
    //     <Image
    //       className="aspect-square min-w-[90px] rounded-full"
    //       width={90}
    //       height={90}
    //       src={imageUri}
    //       alt="product"
    //       unoptimized
    //       onError={() => {
    //         setImageUri(BreadImage);
    //       }}
    //     />
    //     <div className="flex flex-row justify-between items-center w-full gap-1">
    //       <div className="flex flex-col">
    //         <p className="text-xl truncate">Product Name</p>
    //         <p className="text-2xl font-semibold">{name}</p>
    //       </div>
    //       <div className="flex-col hidden 2xl:flex">
    //         <p className="text-xl truncate">Product Id</p>
    //         <p className="text-2xl font-semibold">{productId}</p>
    //       </div>
    //       <div className="flex-col hidden 2xl:flex">
    //         <p className="text-xl">Amount</p>
    //         <p className="text-2xl font-semibold">{amount}</p>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="flex flex-row justify-between gap-2">
    //     <div className="flex flex-col 2xl:hidden">
    //       <p className="text-xl truncate">Product Id</p>
    //       <p className="text-2xl font-semibold">{productId}</p>
    //     </div>
    //     <div className="flex flex-col 2xl:hidden">
    //       <p className="text-xl">Amount</p>
    //       <p className="text-2xl font-semibold">{amount}</p>
    //     </div>
    //   </div>
    //   {consumable && (
    //     <div className="absolute bottom-1.5 right-3 bg-[#141D2D] border border-[#2F3A42] rounded-full text-[#00B6E4] text-sm font-medium px-2 py-0.5">
    //       Consumable
    //     </div>
    //   )}
    // </div>
  );
}

export default ProductTokenListForPoolDetail;
