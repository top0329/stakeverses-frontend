import React from 'react';
import Image from 'next/image';

import Button from '@/components/Buttons';
import PickAxeImage from '@/assets/images/pickaxe.svg';
import { ProductTokenInfo } from '@/types';

function ProductTokenInfoCard({ productId, ratio, consumable }: ProductTokenInfo) {
  return (
    <div className="relative col-span-6 bg-[#053F40] rounded-[20px] px-8 pt-12 pb-5 text-[22px]">
      <div className="flex flex-row justify-between gap-10">
        <Image
          className="min-w-[205px] aspect-square border border-[#040E20] rounded-full"
          src={PickAxeImage}
          alt="pickaxe"
        />
        <div className="flex flex-col justify-center w-full gap-10">
          <div className="flex flex-row">
            <div className="flex flex-row justify-between min-w-[200px]">
              <div className="font-semibold">Product Name</div>
              <div>:</div>
            </div>
            <div className="text-center w-full">Pickaxe</div>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-row justify-between min-w-[200px]">
              <div className="font-semibold">Token Id</div>
              <div>:</div>
            </div>
            <div className="text-center w-full">{productId}</div>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-row justify-between min-w-[200px]">
              <div className="font-semibold">Ratio</div>
              <div>:</div>
            </div>
            <div className="text-center w-full">{ratio}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-end gap-4 pt-2.5">
        <Button className="!w-[88px] !h-[34px] !text-[18px]" text="Edit" />
        <Button
          className="!w-[88px] !h-[34px] !text-[18px] !bg-[#2F3A42]"
          text="Remove"
          variant="outline"
        />
      </div>
      {consumable && (
        <div className="absolute bottom-7 bg-[#2F3A42] rounded-full text-[11px] text-center py-0.5 w-[92px] h-[20px]">
          Consumable
        </div>
      )}
    </div>
  );
}

export default ProductTokenInfoCard;
