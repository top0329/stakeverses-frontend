import React from 'react';
import Image from 'next/image';
import { useAtom } from 'jotai';

import Button from '@/components/Buttons';
import {
  isEditProductTokenModalOpenAtom,
  productTokenInfoAtom,
  selectedProductInfoAtom,
} from '@/jotai/atoms';
import { IProductTokenInfo } from '@/types';
import EditProductTokenModal from '@/components/Modals/EditProductTokenModal';

function ProductTokenInfoCard({
  productName,
  imageUri,
  productId,
  ratio,
  consumable,
}: IProductTokenInfo) {
  const [, setProductTokenInfo] = useAtom(productTokenInfoAtom);
  const [, setIsEditProductTokenModalOpen] = useAtom(
    isEditProductTokenModalOpenAtom
  );
  const [, setSelectedProductInfo] = useAtom(selectedProductInfoAtom);

  const handleEdit = () => {
    setIsEditProductTokenModalOpen(true);
    setSelectedProductInfo({
      productId: productId,
      ratio: ratio,
      consumable: consumable,
    });
  };

  const handleRemove = () => {
    setProductTokenInfo((prevProductTokenInfo) => {
      return prevProductTokenInfo.filter(
        (product) => product.productId !== productId
      );
    });
  };

  return (
    <div className="relative col-span-6 bg-[#053F40] rounded-[20px] px-8 pt-12 pb-5 text-xl">
      <div className="flex flex-row justify-between gap-10">
        <Image
          className="min-w-[205px] max-h-[205px] aspect-square border border-[#040E20] rounded-full"
          src={imageUri || ''}
          width={205}
          height={205}
          alt="product"
          unoptimized
        />
        <div className="flex flex-col justify-center w-full gap-8">
          <div className="flex flex-row">
            <div className="flex flex-row justify-between min-w-[154px]">
              <div className="font-semibold">Product Name</div>
              <div>:</div>
            </div>
            <div className="flex justify-center items-center text-center w-full">
              {productName}
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-row justify-between min-w-[154px]">
              <div className="font-semibold">Token Id</div>
              <div>:</div>
            </div>
            <div className="flex justify-center items-center text-center w-full">
              {productId}
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-row justify-between min-w-[154px]">
              <div className="font-semibold">Ratio</div>
              <div>:</div>
            </div>
            <div className="flex justify-center items-center text-center w-full">
              {ratio}
            </div>
          </div>
          <div className="flex flex-row justify-end gap-4 pt-2.5">
            <Button
              className="!w-[88px] !h-[34px] !text-[18px]"
              text="Edit"
              onClick={handleEdit}
            />
            <Button
              className="!w-[88px] !h-[34px] !text-[18px] !bg-[#2F3A42]"
              text="Remove"
              variant="outline"
              onClick={handleRemove}
            />
          </div>
        </div>
      </div>
      {consumable && (
        <div className="absolute bottom-7 bg-[#2F3A42] rounded-full text-[11px] text-center py-0 w-[92px]">
          Consumable
        </div>
      )}
      <EditProductTokenModal />
    </div>
  );
}

export default ProductTokenInfoCard;
