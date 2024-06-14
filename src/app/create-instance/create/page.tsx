'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';

import Button from '@/components/Buttons';
import ProductTokenListForCreate from '@/components/Lists/ProductTokenListForCreate';
import RewardTokenListForCreate from '@/components/Lists/RewardTokenListForCreate';
import useWeb3 from '@/hooks/useWeb3';
import useToast from '@/hooks/useToast';
import useSpinner from '@/hooks/useSpinner';
import {
  baseAmountAtom,
  productTokenInfoAtom,
  rewardTokenInfoAtom,
} from '@/jotai/atoms';

function CreateInstanceCreatePage() {
  const { account, productStakingInstance, isConnected } = useWeb3();
  const { showToast } = useToast();
  const { openSpin, closeSpin } = useSpinner();
  const router = useRouter();

  const [productTokenInfo, setProductTokenInfo] = useAtom(productTokenInfoAtom);
  const [rewardTokenInfo, setRewardTokenInfo] = useAtom(rewardTokenInfoAtom);
  const [baseAmount, setBaseAmount] = useAtom(baseAmountAtom);

  useEffect(() => {
    if (!isConnected) {
      router.push('/stakes');
      showToast('warning', 'Please connect wallet!');
    }
  }, [isConnected, router, showToast]);

  const handleCreateInstance = async () => {
    try {
      if (
        rewardTokenInfo.filter((token) => token.isApproved).length ===
        rewardTokenInfo.length
      ) {
        openSpin('Creating Instance');
        const _productTokenInfo = productTokenInfo.map((product) => {
          const { imageUri, productName, ...rest } = product;
          return rest;
        });
        const _rewardTokenInfo = rewardTokenInfo.map((rewardToken) => {
          const { imageUri, tokenName, ...rest } = rewardToken;
          return rest;
        });
        await productStakingInstance.methods
          .createStakingInstance(
            _productTokenInfo,
            _rewardTokenInfo,
            baseAmount,
            'Stakeverse Token',
            'stk'
          )
          .send({ from: account });
        setBaseAmount(0);
        setProductTokenInfo([]);
        setRewardTokenInfo([]);
        router.push('/stakes');
      } else {
        showToast('warning', 'Please approve all reward tokens!');
      }
    } catch (err) {
      console.log(err);
    } finally {
      closeSpin();
    }
  };

  return (
    <React.Fragment>
      <h1 className="mt-16 text-3xl text-center font-semibold lg:mt-24 lg:text-4xl xl:text-5xl 2xl:text-6xl">
        Create Instance
      </h1>
      <div className="relative my-8 rounded-[20px] bg-[#040E20]/75 pt-8 xl:my-20 lg:my-16 sm:my-12">
        <div className="flex flex-col items-stretch justify-between gap-4 mt-10 mx-2 pb-10 xl:mx-8 xl:gap-7 lg:flex-row sm:mx-6">
          <div className="w-full text-center">
            <h2 className="text-xl font-semibold mb-6 sm:text-2xl lg:text-3xl">
              Staking Tokens
            </h2>
            <div className="flex flex-col gap-5 bg-gradient-to-r from-[#0f3a38] to-[#0f484a] py-5 px-4 rounded-[20px] h-[90%]">
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
          <div className="w-full text-center">
            <h2 className="text-xl font-semibold mb-6 sm:text-2xl lg:text-3xl">
              Reward Tokens
            </h2>
            <div className="flex flex-col gap-5 bg-gradient-to-r from-[#0f494c] to-[#10585e] py-5 px-4 rounded-[20px] h-[90%]">
              {rewardTokenInfo.map((rewardToken, idx) => (
                <RewardTokenListForCreate
                  key={idx}
                  tokenAddress={rewardToken.tokenAddress}
                  tokenId={rewardToken.tokenId}
                  amount={rewardToken.ratio * baseAmount}
                  isERC1155={rewardToken.isERC1155}
                  isApproved={rewardToken.isApproved}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center gap-4 mt-[50px] pb-[38px] xs:gap-10">
          <Button
            className="!bg-[#192F3A] !w-32 xs:!w-52"
            text="Back"
            variant="outline"
            onClick={() => router.push('/create-instance/reward')}
          />
          <Button
            text="Create Instance"
            className="!w-[200px] xl:!w-[280px] lg:!w-[220px]"
            onClick={handleCreateInstance}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default CreateInstanceCreatePage;
