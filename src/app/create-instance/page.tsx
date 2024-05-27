'use client';

import Subtitle from '@/components/Subtitle';
import React from 'react';

import { isAddProductTokenModalOpenAtom, productTokenInfoAtom } from '@/jotai/atoms';
import { useAtom } from 'jotai';
import Button from '@/components/Buttons';
import AddProductTokenModal from '@/components/Modals/AddProductTokenModal';

function CreateInstancePage() {
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
        <div className="min-h-[315px]">
          {productTokenInfo.length === 0 ? (
            <p className="text-[42px] text-center font-semibold pt-[120px]">
              No Products have been added yet.
            </p>
          ) : (
            <div className='px-10'>product list</div>
          )}
        </div>
        <div className="flex flex-row justify-center gap-10 mt-[50px] mb-[38px]">
          <Button
            text="Add Product"
            onClick={() => setIsAddProductTokenModalOpen(true)}
          />
          <Button className="bg-[#192F3A]" text="Next" variant="outline" />
        </div>
      </div>
      <AddProductTokenModal />
    </React.Fragment>
  );
}

export default CreateInstancePage;
