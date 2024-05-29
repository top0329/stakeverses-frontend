'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';

import Button from '@/components/Buttons';
import ProductTokenListForCreate from '@/components/Lists/ProductTokenListForCreate';
import RewardTokenListForCreate from '@/components/Lists/RewardTokenListForCreate';
import useWeb3 from '@/hooks/useWeb3';
import {
  baseAmountAtom,
  productTokenInfoAtom,
  rewardTokenInfoAtom,
} from '@/jotai/atoms';

function CreateInstanceCreatePage() {
  const { account, productStakingInstance } = useWeb3();
  const router = useRouter();

  const [productTokenInfo] = useAtom(productTokenInfoAtom);
  const [rewardTokenInfo] = useAtom(rewardTokenInfoAtom);
  const [baseAmount] = useAtom(baseAmountAtom);

  const handleCreateInstance = async () => {
    try {
      await productStakingInstance.methods
        .createStakingInstance(
          productTokenInfo,
          rewardTokenInfo,
          baseAmount,
          'Stakeverse Token',
          'stk'
        )
        .send({ from: account });
      router.push('/stakes');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <h1 className="mt-[203px] text-[62px] text-center font-semibold">
        Create Instance
      </h1>
      <div className="relative my-24 rounded-[20px] bg-[#030C1B] pt-[80px]">
        <div className="flex flex-row justify-between gap-7 mt-5 mx-8 h-full">
          <div className="w-full text-[38px] text-center h-full">
            <h2 className="text-[38px] font-semibold mb-6">Staking Tokens</h2>
            <div className="flex flex-col gap-[22px] bg-gradient-to-r from-[#0f3a38] to-[#0f484a] py-5 px-9 rounded-[20px] mb-10 h-[500px] overflow-y-auto custom-scrollbar">
              {productTokenInfo.map((productToken) => (
                <ProductTokenListForCreate
                  key={productToken.productId}
                  productAddress={productToken.productAddress}
                  productId={productToken.productId}
                  ratio={productToken.ratio}
                  consumable={productToken.consumable}
                />
              ))}
            </div>
          </div>
          <div className="w-full text-[38px] text-center h-full">
            <h2 className="text-[38px] font-semibold mb-6">Reward Tokens</h2>
            <div className="flex flex-col gap-[22px] bg-gradient-to-r from-[#0f494c] to-[#10585e] py-5 px-9 rounded-[20px] mb-10 h-[500px] overflow-y-auto custom-scrollbar">
              {rewardTokenInfo.map((rewardToken) => (
                <RewardTokenListForCreate
                  key={rewardToken.tokenId}
                  tokenAddress={rewardToken.tokenAddress}
                  tokenId={rewardToken.tokenId}
                  amount={rewardToken.ratio * baseAmount}
                  isERC1155={rewardToken.isERC1155}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center gap-10 mt-[50px] pb-[38px]">
          <Button
            className="!bg-[#192F3A]"
            text="Back"
            variant="outline"
            onClick={() => router.push('/create-instance/reward')}
          />
          <Button text="Create Instance" onClick={handleCreateInstance} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default CreateInstanceCreatePage;
