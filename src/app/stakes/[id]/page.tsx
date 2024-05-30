'use client';

import React, { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAtom } from 'jotai';

import Button from '@/components/Buttons';
import Subtitle from '@/components/Subtitle';
import ProductTokenForStakeList from '@/components/ProductToken/ProductTokenForStakeList';
import ProductTokenListForPoolDetail from '@/components/Lists/ProductTokenListForPoolDetail';
import RewardTokenListForPoolDetail from '@/components/Lists/RewardTokenListForPoolDetail';
import useWeb3 from '@/hooks/useWeb3';
import {
  IProductTokenForStakeListProps,
  IRewardTokenInfoForStakeListProps,
} from '@/types';
import { truncateAddress } from '@/lib/utils';
import { currentPoolDataAtom } from '@/jotai/atoms';

function PoolDetails() {
  const router = useRouter();
  const { id } = useParams();
  const { productStakingInstance } = useWeb3();

  const [currentPoolData, setCurrentPoolData] = useAtom(currentPoolDataAtom);

  useEffect(() => {
    async function fetchPoolData() {
      const _poolData = await productStakingInstance.methods
        .getStakingInfo(id)
        .call();
      setCurrentPoolData(_poolData);
    }
    if (Object.keys(productStakingInstance).length > 0) {
      fetchPoolData();
    }
  }, [id, productStakingInstance, setCurrentPoolData]);

  return (
    <React.Fragment>
      <h1 className="mt-[203px] text-[62px] text-center font-semibold">
        Stakes
      </h1>
      <div className="relative my-24 rounded-[20px] bg-[#030C1B] px-[34px]">
        <Subtitle text="Pool Detail" />
        <div className="px-[54px] mb-12">
          <div className="flex items-center justify-between">
            {currentPoolData.productInfo.length > 0 &&
              currentPoolData.productInfo
                .filter(
                  (product: IProductTokenForStakeListProps) =>
                    product.consumable === false
                )
                .map(
                  (product: IProductTokenForStakeListProps, index: number) => (
                    <React.Fragment key={index}>
                      <ProductTokenForStakeList
                        productId={product.productId}
                        ratio={product.ratio}
                      />
                      {currentPoolData.productInfo.filter(
                        (product: IProductTokenForStakeListProps) =>
                          product.consumable === true
                      ).length !== 0 && (
                        <p className="text-[35px] font-medium -mt-16 px-1">+</p>
                      )}
                    </React.Fragment>
                  )
                )}
            {currentPoolData.productInfo.length > 0 &&
            currentPoolData.productInfo.filter(
              (product: IProductTokenForStakeListProps) =>
                product.consumable === true
            ).length > 0 ? (
              <React.Fragment>
                <p className="text-[50px] font-medium -mt-16 px-1">&#40;</p>
                {currentPoolData.productInfo
                  .filter(
                    (product: IProductTokenForStakeListProps) =>
                      product.consumable === true
                  )
                  .map(
                    (
                      product: IProductTokenForStakeListProps,
                      index: number
                    ) => (
                      <React.Fragment key={index}>
                        <ProductTokenForStakeList
                          productId={product.productId}
                          ratio={product.ratio}
                          consumable
                        />
                        {index !== currentPoolData.productInfo.length - 1 && (
                          <p className="text-[35px] font-medium -mt-16 px-1">
                            +
                          </p>
                        )}
                      </React.Fragment>
                    )
                  )}
                <p className="text-[50px] font-medium -mt-16 px-1">&#41;</p>
                <p className="text-[22px] -mt-14 px-1 whitespace-nowrap">
                  * 1 min{' '}
                </p>
              </React.Fragment>
            ) : null}
            <p className="text-[22px] -mt-14 px-1 whitespace-nowrap">=</p>
            {currentPoolData.rewardTokenInfo.length > 0 &&
              currentPoolData.rewardTokenInfo.map(
                (
                  rewardToken: IRewardTokenInfoForStakeListProps,
                  index: number
                ) => (
                  <React.Fragment key={index}>
                    <ProductTokenForStakeList
                      productId={rewardToken.tokenId}
                      ratio={rewardToken.ratio}
                    />
                    {index !== currentPoolData.productInfo.length - 1 && (
                      <p className="text-[35px] font-medium -mt-16 px-1">+</p>
                    )}
                  </React.Fragment>
                )
              )}
          </div>
          <div className="flex flex-row justify-between py-9">
            <div className="flex flex-col items-center gap-2.5 w-[194px] text-center">
              <p className="text-[22px]">Instance Id</p>
              <div className="w-full bg-transparent border border-[#2F3A42] rounded-[15px] px-4 py-3 text-xl font-medium">
                {id}
              </div>
            </div>
            <div className="flex flex-col items-center gap-2.5 w-[194px] text-center">
              <p className="text-[22px]">Creator Address</p>
              <div className="w-full bg-transparent border border-[#2F3A42] rounded-[15px] px-4 py-3 text-xl font-medium">
                {truncateAddress(currentPoolData.creator)}
              </div>
            </div>
            <div className="flex flex-col items-center gap-2.5 w-[194px] text-center">
              <p className="text-[22px]">Instance Address</p>
              <div className="w-full bg-transparent border border-[#2F3A42] rounded-[15px] px-4 py-3 text-xl font-medium">
                {truncateAddress(currentPoolData.instanceAddress)}
              </div>
            </div>
            <div className="flex flex-col items-center gap-2.5 w-[194px] text-center">
              <p className="text-[22px]">Remaining time</p>
              <div className="w-full bg-transparent border border-[#2F3A42] rounded-[15px] px-4 py-3 text-xl font-medium">
                03:28
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#192F3A] to-[#06C2C4] rounded-2xl p-0.5">
          <div className="bg-gradient-to-r from-[#010c09] to-[#044756] rounded-2xl">
            <div className="flex flex-row justify-between pt-10 px-[156px]">
              <div className="flex flex-col items-center gap-2.5 w-[194px] text-center">
                <p className="text-[22px]">Total Value Staked</p>
                <div className="w-full bg-transparent border rounded-[15px] px-4 py-3 text-xl font-medium">
                  1436
                </div>
              </div>
              <div className="flex flex-col items-center gap-2.5 w-[194px] text-center">
                <p className="text-[22px] truncate">Number of Stakers</p>
                <div className="w-full bg-transparent border rounded-[15px] px-4 py-3 text-xl font-medium">
                  394
                </div>
              </div>
              <div className="flex flex-col items-center gap-2.5 w-[194px] text-center">
                <p className="text-[22px]">Age</p>
                <div className="w-full bg-transparent border rounded-[15px] px-4 py-3 text-xl font-medium">
                  35
                </div>
              </div>
              <div className="flex flex-col items-center gap-2.5 w-[194px] text-center">
                <p className="text-[22px]">Pool State</p>
                <div className="w-full bg-transparent border rounded-[15px] px-4 py-3 text-xl font-medium">
                  398
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between gap-7 mt-10 mx-8 h-full">
              <div className="w-full text-[38px] text-center h-full">
                <h2 className="text-[38px] font-semibold mb-6">
                  Staking Tokens
                </h2>
                <div className="flex flex-col gap-[22px] bg-gradient-to-r from-[#0f3a38] to-[#0f484a] py-5 px-9 rounded-[20px] mb-10 h-[500px] overflow-y-auto custom-scrollbar">
                  {currentPoolData.productInfo.map(
                    (product: IProductTokenForStakeListProps) => (
                      <ProductTokenListForPoolDetail
                        key={product.productId}
                        productId={Number(product.productId)}
                        consumable={product.consumable}
                      />
                    )
                  )}
                </div>
              </div>
              <div className="w-full text-[38px] text-center h-full">
                <h2 className="text-[38px] font-semibold mb-6">
                  Reward Tokens
                </h2>
                <div className="flex flex-col gap-[22px] bg-gradient-to-r from-[#0f494c] to-[#10585e] py-5 px-9 rounded-[20px] mb-10 h-[500px] overflow-y-auto custom-scrollbar">
                  {currentPoolData.rewardTokenInfo.map(
                    (rewardToken: IRewardTokenInfoForStakeListProps) => (
                      <RewardTokenListForPoolDetail
                        key={rewardToken.tokenId}
                        tokenAddress={rewardToken.tokenAddress}
                        tokenId={Number(rewardToken.tokenId)}
                        ratio={Number(rewardToken.ratio)}
                        isERC1155={rewardToken.isERC1155}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center py-10">
          <Button
            className="!w-[200px]"
            text="Stake"
            onClick={() => router.push(`/stakes/${id}/stake`)}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default PoolDetails;
