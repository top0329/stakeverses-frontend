'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Web3 from 'web3';
import { useAtom } from 'jotai';

import Button from '@/components/Buttons';
import Subtitle from '@/components/Subtitle';
import ProductTokenForStakeList from '@/components/ProductToken/ProductTokenForStakeList';
import RewardTokenForStakeList from '@/components/ProductToken/RewardTokenForStakeList';
import ProductTokenListForPoolDetail from '@/components/Lists/ProductTokenListForPoolDetail';
import RewardTokenListForPoolDetail from '@/components/Lists/RewardTokenListForPoolDetail';
import useWeb3 from '@/hooks/useWeb3';
import ProductStakingAbi from '@/abi/ProductStakingAbi.json';
import {
  IProductTokenForStakeListProps,
  IRewardTokenInfoForStakeListProps,
} from '@/types';
import { currentPoolDataAtom } from '@/jotai/atoms';
import { truncateAddress } from '@/lib/utils';

const web3 = new Web3(window.ethereum);

function PoolDetailsPage() {
  const router = useRouter();
  const { id } = useParams();
  const { productStakingInstance } = useWeb3();

  const [currentPoolData, setCurrentPoolData] = useAtom(currentPoolDataAtom);

  const [poolStatus, setPoolStatus] = useState<boolean>(false);
  const [numberOfStakers, setNumberOfStakers] = useState<number>(0);
  const [remainingAmount, setRemainingAmount] = useState<number>(0);
  const [totalStakingBaseAmount, setTotalStakingBaseAmount] =
    useState<number>(0);
  const [remainingTime, setRemainingTime] = useState<number>(0);

  useEffect(() => {
    async function fetchPoolData() {
      const _poolData = await productStakingInstance.methods
        .getStakingInfo(id)
        .call();
      const _poolStatus =
        await productStakingInstance.methods.getInstancePausingStatus(id);
      const productStakingWeb3: any = new web3.eth.Contract(
        ProductStakingAbi,
        _poolData?.instanceAddress
      );
      const _numberOfStakers = await productStakingWeb3.methods
        .getStakers()
        .call();
      const _totalStakingBaseAmount = await productStakingWeb3.methods
        .totalStakingBaseAmount()
        .call();
      const _remainingTime = await productStakingWeb3.methods
        .devGetStakingEndTime()
        .call();
      const _remainingAmount = await productStakingWeb3.methods
        .devGetRemainingTokens()
        .call();
      setCurrentPoolData(_poolData);
      setPoolStatus(_poolStatus);
      setNumberOfStakers(_numberOfStakers.length);
      setTotalStakingBaseAmount(Number(_totalStakingBaseAmount));
      setRemainingTime(Number(_remainingTime));
      setRemainingAmount(Number(_remainingAmount));
    }
    if (Object.keys(productStakingInstance).length > 0) {
      fetchPoolData();
    }
  }, [id, productStakingInstance, setCurrentPoolData]);

  const calcRemainingTime = (remainingTime: number) => {
    const stakingEndTime = remainingTime;
    const stakingEndTimeInMs = stakingEndTime * 1000;
    const currentTimeInMs = Date.now();
    const remainingTimeInMs = stakingEndTimeInMs - currentTimeInMs;
    const remainingDays = Math.ceil(remainingTimeInMs / (1000 * 60 * 60 * 24));
    return remainingDays;
  };

  return (
    <React.Fragment>
      <h1 className="mt-[203px] text-[62px] text-center font-semibold">
        Stakes
      </h1>
      <div className="relative my-24 rounded-[20px] bg-[#040E20]/75 px-[34px]">
        <Subtitle text="Pool Details" />
        <div className="px-[54px] mb-12">
          <div className="flex items-center justify-center">
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
                <p className="text-xl -mt-14 px-1 whitespace-nowrap">
                  * 1 min{' '}
                </p>
              </React.Fragment>
            ) : null}
            <p className="text-xl -mt-14 px-1 whitespace-nowrap">=</p>
            {currentPoolData.rewardTokenInfo.length > 0 &&
              currentPoolData.rewardTokenInfo.map(
                (
                  rewardToken: IRewardTokenInfoForStakeListProps,
                  index: number
                ) => (
                  <React.Fragment key={index}>
                    <RewardTokenForStakeList
                      tokenId={rewardToken.tokenId}
                      tokenAddress={rewardToken.tokenAddress}
                      ratio={rewardToken.ratio}
                      isERC1155={rewardToken.isERC1155}
                    />
                    {index !== currentPoolData.rewardTokenInfo.length - 1 && (
                      <p className="text-[35px] font-medium -mt-16 px-1">+</p>
                    )}
                  </React.Fragment>
                )
              )}
          </div>
          <div className="flex flex-row justify-between py-9">
            <div className="flex flex-col items-center gap-2.5 w-[194px] text-center">
              <p className="text-xl">Instance Id</p>
              <div className="w-full bg-transparent border border-[#2F3A42] rounded-[15px] px-4 py-3 text-xl font-medium">
                {id}
              </div>
            </div>
            <div className="flex flex-col items-center gap-2.5 w-[194px] text-center">
              <p className="text-xl">Instance Address</p>
              <div className="w-full bg-transparent border border-[#2F3A42] rounded-[15px] px-4 py-3 text-xl font-medium">
                {truncateAddress(currentPoolData.instanceAddress)}
              </div>
            </div>
            <div className="flex flex-col items-center gap-2.5 w-[194px] text-center">
              <p className="text-xl">Creator Address</p>
              <div className="w-full bg-transparent border border-[#2F3A42] rounded-[15px] px-4 py-3 text-xl font-medium">
                {truncateAddress(currentPoolData.creator)}
              </div>
            </div>
            <div className="flex flex-col items-center gap-2.5 w-[194px] text-center">
              <p className="text-xl">Remaining Time</p>
              <div className="w-full bg-transparent border border-[#2F3A42] rounded-[15px] px-4 py-3 text-xl font-medium">
                {calcRemainingTime(remainingTime)} days
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#192F3A] to-[#06C2C4] rounded-2xl p-0.5">
          <div className="bg-gradient-to-r from-[#010c09] to-[#044756] rounded-2xl">
            <div className="flex flex-row justify-between pt-10 px-[156px]">
              <div className="flex flex-col items-center gap-2.5 w-[194px] text-center">
                <p className="text-xl">Total Value Staked</p>
                <div className="w-full bg-transparent border rounded-[15px] px-4 py-3 text-xl font-medium">
                  {totalStakingBaseAmount}
                </div>
              </div>
              <div className="flex flex-col items-center gap-2.5 w-[194px] text-center">
                <p className="text-xl truncate">Remaining Amount</p>
                <div className="w-full bg-transparent border rounded-[15px] px-4 py-3 text-xl font-medium">
                  {remainingAmount}
                </div>
              </div>
              <div className="flex flex-col items-center gap-2.5 w-[194px] text-center">
                <p className="text-xl truncate">Number of Stakers</p>
                <div className="w-full bg-transparent border rounded-[15px] px-4 py-3 text-xl font-medium">
                  {numberOfStakers}
                </div>
              </div>
              <div className="flex flex-col items-center gap-2.5 w-[194px] text-center">
                <p className="text-xl">Pool State</p>
                <div
                  className={`w-full bg-transparent border rounded-[15px] px-4 py-3 text-xl font-medium ${
                    poolStatus ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {poolStatus ? 'Active' : 'Inactive'}
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between gap-7 mt-10 mx-8 h-full">
              <div className="w-full text-[38px] text-center h-full">
                <h2 className="text-3xl font-semibold mb-6">Staking Tokens</h2>
                <div className="flex flex-col gap-[22px] bg-gradient-to-r from-[#0f3a38] to-[#0f484a] py-5 px-9 rounded-[20px] mb-10 h-[500px] overflow-y-auto custom-scrollbar">
                  {currentPoolData.productInfo.map(
                    (product: IProductTokenForStakeListProps) => (
                      <ProductTokenListForPoolDetail
                        key={product.productId}
                        productId={Number(product.productId)}
                        amount={totalStakingBaseAmount * Number(product.ratio)}
                        consumable={product.consumable}
                      />
                    )
                  )}
                </div>
              </div>
              <div className="w-full text-[38px] text-center h-full">
                <h2 className="text-3xl font-semibold mb-6">Reward Tokens</h2>
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
            onClick={() => router.push(`/stakes/${id}/staking`)}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default PoolDetailsPage;
