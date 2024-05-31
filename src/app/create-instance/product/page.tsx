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

  useEffect(() => {
    if (!isConnected) {
      router.back();
      showToast('warning', 'Please connect wallet!');
    }
  }, [isConnected, router, showToast]);

  const handleAddProduct = () => {
    setIsAddProductTokenModalOpen(true);
  };

  const handleNext = () => {
    if (productTokenInfo.length === 0) showToast('fail', 'You need to add at least one product!');
    else router.push('/create-instance/reward');
  };

  return (
    <React.Fragment>
      <h1 className="mt-[203px] text-[62px] text-center font-semibold">
        Create Instance
      </h1>
      <div className="relative my-24 rounded-[20px] bg-[#040E20]/75 min-h-[644px]">
        <Subtitle text="Token for Stake" />
        <div className="grid grid-cols-12 min-h-[315px] gap-x-20 gap-y-10 px-10">
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
