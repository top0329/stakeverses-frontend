import React from 'react';
import { useRouter } from 'next/navigation';

import Subtitle from '@/components/Subtitle';
import Button from '@/components/Buttons';

function CreateInstanceCreatePage() {
  const router = useRouter();

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
              {/* {productTokenInfo.map((productToken) => (
                <ProductTokenInfoCard
                  key={productToken.id}
                  id={productToken.id}
                  ratio={productToken.ratio}
                  consumable={productToken.consumable}
                />
              ))} */}
            </React.Fragment>
          )}
        </div>
        <div className="flex flex-row justify-center gap-10 mt-[50px] pb-[38px]">
          <Button
            text="Add Reward"
            onClick={() => setIsAddProductTokenModalOpen(true)}
          />
          <Button
            className="bg-[#192F3A]"
            text="Next"
            variant="outline"
            onClick={() => router.push('/create-instance/create')}
          />
        </div>
      </div>
      <AddProductTokenModal />
    </React.Fragment>
  );
}

export default CreateInstanceCreatePage;
