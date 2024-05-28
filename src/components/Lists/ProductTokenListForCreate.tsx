import React from 'react';
import Image from 'next/image';

import BreadImage from '@/assets/images/bread.svg';
import { IProductTokenInfo } from '@/types';

function ProductTokenListForCreate({
  productId,
  ratio,
  consumable,
}: IProductTokenInfo) {
  return (
    <div className="relative flex flex-row py-6 px-8 bg-[#141D2D]/70 rounded-[20px] gap-7">
      <Image
        className="min-w-[90px] aspect-square rounded-full"
        src={BreadImage}
        alt="bread"
      />
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-col">
          <p className="text-[22px]">Product Name</p>
          <p className="text-[28px] font-semibold">Bread</p>
        </div>
        <div className="flex flex-col">
          <p className="text-[22px]">Product Id</p>
          <p className="text-[28px] font-semibold">{productId}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-[22px]">Ratio</p>
          <p className="text-[28px] font-semibold">{ratio}</p>
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

export default ProductTokenListForCreate;
