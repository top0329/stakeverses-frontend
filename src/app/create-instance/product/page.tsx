'use client';

import Subtitle from '@/components/Subtitle';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';

import {
  isAddProductTokenModalOpenAtom,
  productTokenInfoAtom,
} from '@/jotai/atoms';
import Button from '@/components/Buttons';
import AddProductTokenModal from '@/components/Modals/AddProductTokenModal';
import ProductTokenInfoCard from '@/components/Cards/ProductTokenInfoCard';
import useToast from '@/hooks/useToast';
import useWeb3 from '@/hooks/useWeb3';

function CreateInstanceProductPage() {
  const { isConnected } = useWeb3();
  const { showToast } = useToast();
  const router = useRouter();

  const [productTokenInfo] = useAtom(productTokenInfoAtom);
  const [, setIsAddProductTokenModalOpen] = useAtom(
    isAddProductTokenModalOpenAtom
  );

  // useEffect(() => {
  //   if (!isConnected) {
  //     router.push('/stakes');
  //     showToast('warning', 'Please connect wallet!');
  //   }
  // }, [isConnected, router, showToast]);

  const handleAddProduct = () => {
    setIsAddProductTokenModalOpen(true);
  };

  const handleNext = () => {
    if (productTokenInfo.length === 0)
      showToast('fail', 'You need to add at least one product!');
    else router.push('/create-instance/reward');
  };

  return (
    <React.Fragment>
      <h1 className="mt-16 text-3xl text-center font-semibold lg:mt-24 lg:text-4xl xl:text-5xl 2xl:text-6xl">
        Create Instance
      </h1>
      <div className="relative px-2 my-8 rounded-[20px] bg-[#040E20]/75 xl:my-20 lg:my-16 lg:px-4 md:px-8 sm:my-12 sm:px-2">
        <Subtitle text="Token for Stake" />
        <div className="grid grid-cols-12 min-h-[315px] gap-x-20 gap-y-10">
          {productTokenInfo.length === 0 ? (
            <p className="col-span-12 text-[42px] text-center font-semibold pt-[120px]">
              No Products have been added yet.
            </p>
          ) : (
            <React.Fragment>
              {productTokenInfo.map((productToken) => (
                <ProductTokenInfoCard
                  key={productToken.productId}
                  productName={productToken.productName}
                  imageUri={productToken.imageUri}
                  productId={productToken.productId}
                  ratio={productToken.ratio}
                  consumable={productToken.consumable}
                />
              ))}
            </React.Fragment>
          )}
        </div>
        <div className="flex flex-row justify-center gap-10 mt-[50px] pb-[38px]">
          <Button
            text="Add Product"
            className={`${productTokenInfo.length > 3 && 'opacity-50'}`}
            onClick={handleAddProduct}
            disabled={productTokenInfo.length > 3}
          />
          <Button
            className="!bg-[#192F3A]"
            text="Next"
            variant="outline"
            onClick={handleNext}
          />
        </div>
      </div>
      <AddProductTokenModal />
    </React.Fragment>
  );
}

export default CreateInstanceProductPage;
