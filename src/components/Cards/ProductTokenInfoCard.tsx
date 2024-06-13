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
    <div className="col-span-12 flex items-center bg-[#053F40] rounded-[20px] px-4 py-8 text-xl md:px-8 xs:col-span-6">
      <div className="flex flex-col justify-between items-center w-full h-full gap-4 2xl:gap-10 xl:flex-row">
        <div className="flex flex-col items-center gap-1">
          <Image
            className="min-w-[205px] max-h-[205px] aspect-square border border-[#040E20] rounded-full"
            src={imageUri || ''}
            width={205}
            height={205}
            alt="product"
            unoptimized
          />
          {consumable && (
            <div className="bg-[#2F3A42] rounded-full text-[11px] text-center py-0 w-[92px]">
              Consumable
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between text-base w-full gap-4 xl:gap-8 md:text-lg">
          <div className="flex flex-row gap-1">
            <div className="flex flex-row justify-between min-w-[106px] md:min-w-[120px]">
              <div className="tracking-[-1px]">Product Name</div>
              <div>:</div>
            </div>
            <div className="flex justify-center items-center text-center w-full truncate font-semibold">
              {productName}
            </div>
          </div>
          <div className="flex flex-row gap-1">
            <div className="flex flex-row justify-between min-w-[106px] md:min-w-[120px]">
              <div className="tracking-[-1px]">Token Id</div>
              <div>:</div>
            </div>
            <div className="flex justify-center items-center text-center w-full font-semibold">
              {productId}
            </div>
          </div>
          <div className="flex flex-row gap-1">
            <div className="flex flex-row justify-between min-w-[106px] md:min-w-[120px]">
              <div className="tracking-[-1px]">Ratio</div>
              <div>:</div>
            </div>
            <div className="flex justify-center items-center text-center w-full font-semibold">
              {ratio}
            </div>
          </div>
          <div className="flex flex-row justify-center gap-4 sm:justify-end">
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
      <EditProductTokenModal />
    </div>
  );
}

export default ProductTokenInfoCard;
