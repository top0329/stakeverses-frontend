'use client';

import Subtitle from '@/components/Subtitle';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';

import {
  isAddProductTokenModalOpenAtom,
  productTokenInfoAtom,
} from '@/jotai/atoms';
import Button from '@/components/Buttons';
import AddProductTokenModal from '@/components/Modals/AddProductTokenModal';
import ProductTokenInfoCard from '@/components/Cards/ProductTokenInfoCard';

function CreateInstanceProductPage() {
  const router = useRouter();

  const [productTokenInfo] = useAtom(productTokenInfoAtom);
  const [, setIsAddProductTokenModalOpen] = useAtom(
    isAddProductTokenModalOpenAtom
  );

  return (
    <React.Fragment>
      <h1 className="mt-[203px] text-[62px] text-center font-semibold">
        Create Instance
      </h1>
      <div className="relative my-24 rounded-[20px] bg-[#030C1B] min-h-[644px]">
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
            onClick={() => setIsAddProductTokenModalOpen(true)}
          />
          <Button className="!bg-[#192F3A]" text="Next" variant="outline" onClick={() => router.push('/create-instance/reward')} />
        </div>
      </div>
      <AddProductTokenModal />
    </React.Fragment>
  );
}

export default CreateInstanceProductPage;
